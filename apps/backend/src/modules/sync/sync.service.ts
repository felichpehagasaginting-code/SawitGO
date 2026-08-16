import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { SyncAuditTrail } from './sync-audit-trail.entity';
import { BatchSyncDto, HarvestPayloadItemDto } from './dto/batch-sync.dto';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);
  // Role Multiplier menggunakan 10^12 (1.000.000.000.000n) agar bobot role (1-5) 
  // berada di digit triliun di atas epoch timestamp milidetik 13-digit (1.723.xxx.xxx.xxx)
  private readonly ROLE_MULTIPLIER = 1_000_000_000_000n;

  constructor(
    @InjectRepository(HarvestLog)
    private harvestLogRepo: Repository<HarvestLog>,
    @InjectRepository(SyncAuditTrail)
    private syncAuditTrailRepo: Repository<SyncAuditTrail>,
  ) {}

  /**
   * Menghitung Skor Prioritas Resolusi Konflik:
   * Priority Score = (Role Weight * 1.000.000.000.000) + Timestamp (ms)
   * Contoh:
   * - Krani (Weight 1) + 1723850000000 -> 2.723.850.000.000
   * - Asisten (Weight 3) + 1723850000000 -> 4.723.850.000.000
   * - Manager (Weight 5) + 1723850000000 -> 6.723.850.000.000
   */
  calculatePriorityScore(roleWeight: number, timestampMs: number | bigint): bigint {
    return BigInt(roleWeight) * this.ROLE_MULTIPLIER + BigInt(timestampMs);
  }

  async processBatch(batchDto: BatchSyncDto, authenticatedUser?: any) {
    const results: any[] = [];
    let successCount = 0;
    let conflictCount = 0;

    for (const record of batchDto.records) {
      const result = await this.resolveSingleHarvest(record, batchDto.deviceId, authenticatedUser);
      results.push(result);
      if (
        result.status === 'ACCEPTED_NEW' ||
        result.status === 'ACCEPTED_OVERWRITE' ||
        result.status === 'IGNORED_IDEMPOTENT'
      ) {
        successCount++;
      } else {
        conflictCount++;
      }
    }

    return {
      totalReceived: batchDto.records.length,
      successCount,
      conflictCount,
      processedItems: results,
    };
  }

  private async resolveSingleHarvest(
    item: HarvestPayloadItemDto,
    deviceId: string,
    authenticatedUser?: any,
  ) {
    const userRoleWeight = authenticatedUser?.roleWeight || (item as any).userRoleWeight || 1;
    const incomingScore = this.calculatePriorityScore(userRoleWeight, item.clientTimestampMs);

    const existing = await this.harvestLogRepo.findOne({ where: { id: item.id } });

    // Skenario 1: Record Baru (Belum ada di database)
    if (!existing) {
      const newHarvest = this.harvestLogRepo.create({
        id: item.id,
        tphId: item.tphId,
        blockId: item.blockId,
        userId: authenticatedUser?.id || 'e4444444-4444-4444-4444-444444444444',
        harvestDate: item.harvestDate,
        janjangCount: item.janjangCount,
        brondolanWeightKg: item.brondolanWeightKg || 0,
        mentahCount: item.mentahCount || 0,
        masakCount: item.masakCount || 0,
        lewatMasakCount: item.lewatMasakCount || 0,
        tangkaiPanjangCount: item.tangkaiPanjangCount || 0,
        status: 'PENDING',
        clientTimestampMs: item.clientTimestampMs.toString(),
        priorityScore: incomingScore.toString(),
        idempotencyKey: item.idempotencyKey,
        gpsAccuracyMeters: item.location?.accuracy,
        gpsCoordinateRecorded: item.location
          ? () => `ST_SetSRID(ST_MakePoint(${item.location.longitude}, ${item.location.latitude}), 4326)`
          : null,
      });

      await this.harvestLogRepo.save(newHarvest);

      await this.logAuditTrail({
        harvestLogId: item.id,
        userId: authenticatedUser?.id || 'e4444444-4444-4444-4444-444444444444',
        userRoleWeight,
        clientTimestampMs: item.clientTimestampMs.toString(),
        calculatedPriorityScore: incomingScore.toString(),
        syncAction: 'INSERT',
        payloadSnapshot: item,
        conflictReason: 'New Record Created',
        deviceInfo: deviceId,
      });

      return {
        id: item.id,
        status: 'ACCEPTED_NEW',
        httpStatus: 201,
        message: 'Record baru panen berhasil disimpan.',
        winningScore: incomingScore.toString(),
      };
    }

    // Skenario 2: Benturan Data / Update - Evaluasi Priority Score
    const existingScore = BigInt(existing.priorityScore);

    if (incomingScore > existingScore) {
      // Incoming score lebih tinggi (Peran lebih tinggi atau timestamp lebih baru pada peran yang sama)
      existing.janjangCount = item.janjangCount;
      existing.brondolanWeightKg = item.brondolanWeightKg || existing.brondolanWeightKg;
      existing.mentahCount = item.mentahCount ?? existing.mentahCount;
      existing.masakCount = item.masakCount ?? existing.masakCount;
      existing.lewatMasakCount = item.lewatMasakCount ?? existing.lewatMasakCount;
      existing.tangkaiPanjangCount = item.tangkaiPanjangCount ?? existing.tangkaiPanjangCount;
      existing.clientTimestampMs = item.clientTimestampMs.toString();
      existing.priorityScore = incomingScore.toString();
      existing.idempotencyKey = item.idempotencyKey;

      await this.harvestLogRepo.save(existing);

      await this.logAuditTrail({
        harvestLogId: item.id,
        userId: authenticatedUser?.id || existing.userId,
        userRoleWeight,
        clientTimestampMs: item.clientTimestampMs.toString(),
        calculatedPriorityScore: incomingScore.toString(),
        syncAction: 'UPDATE_OVERWRITE',
        payloadSnapshot: item,
        conflictReason: `Overwrote existing record (Score: ${existingScore} replaced by ${incomingScore})`,
        deviceInfo: deviceId,
      });

      return {
        id: item.id,
        status: 'ACCEPTED_OVERWRITE',
        httpStatus: 200,
        message: 'Record berhasil di-overwrite berdasarkan priority score otoritas lebih tinggi.',
        winningScore: incomingScore.toString(),
      };
    } else if (incomingScore === existingScore) {
      // Idempotency: Request identik dikirim berulang karena network retry
      return {
        id: item.id,
        status: 'IGNORED_IDEMPOTENT',
        httpStatus: 200,
        message: 'Transaksi duplikat diabaikan (Idempotent Acknowledged).',
        winningScore: existingScore.toString(),
      };
    } else {
      // Incoming data kalah (Stale / Otoritas lebih rendah)
      await this.logAuditTrail({
        harvestLogId: item.id,
        userId: authenticatedUser?.id || existing.userId,
        userRoleWeight,
        clientTimestampMs: item.clientTimestampMs.toString(),
        calculatedPriorityScore: incomingScore.toString(),
        syncAction: 'REJECT_STALE',
        payloadSnapshot: item,
        conflictReason: `Rejected incoming payload with lower priority score (${incomingScore} vs existing ${existingScore})`,
        deviceInfo: deviceId,
      });

      return {
        id: item.id,
        status: 'REJECTED_STALE',
        httpStatus: 409,
        message: 'Data transaksi ditolak karena data di server memiliki prioritas lebih tinggi.',
        winningScore: existingScore.toString(),
        serverWinningData: {
          id: existing.id,
          janjangCount: existing.janjangCount,
          brondolanWeightKg: existing.brondolanWeightKg,
          priorityScore: existing.priorityScore,
        },
      };
    }
  }

  private async logAuditTrail(data: Partial<SyncAuditTrail>) {
    try {
      const audit = this.syncAuditTrailRepo.create(data);
      await this.syncAuditTrailRepo.save(audit);
    } catch (err) {
      this.logger.error('Gagal mencatat sync audit trail:', err);
    }
  }
}
