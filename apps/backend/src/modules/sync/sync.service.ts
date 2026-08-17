import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { SyncAuditTrail } from './sync-audit-trail.entity';
import { TPH } from '../tph/tph.entity';
import { Block } from '../blocks/block.entity';
import { User } from '../users/user.entity';
import { BatchSyncDto, HarvestPayloadItemDto } from './dto/batch-sync.dto';

export interface SyncAuthenticatedUser {
  id?: string;
  roleWeight?: number;
}

interface HarvestPayloadWithRoleWeight extends HarvestPayloadItemDto {
  userRoleWeight?: number;
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
    @InjectRepository(TPH)
    private tphRepo: Repository<TPH>,
    @InjectRepository(Block)
    private blockRepo: Repository<Block>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  /**
   * Menghitung Skor Prioritas Resolusi Konflik:
   * Priority Score = (Role Weight * 1.000.000.000.000) + Timestamp (ms)
   */
  calculatePriorityScore(
    roleWeight: number,
    timestampMs: number | bigint,
  ): bigint {
    return BigInt(roleWeight) * this.ROLE_MULTIPLIER + BigInt(timestampMs);
  }

  async processBatch(
    batchDto: BatchSyncDto,
    authenticatedUser?: SyncAuthenticatedUser | null,
  ) {
    const results: any[] = [];
    let successCount = 0;
    let conflictCount = 0;

    for (const record of batchDto.records) {
      try {
        const result = await this.resolveSingleHarvest(
          record,
          batchDto.deviceId,
          authenticatedUser,
        );
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
      } catch (err: any) {
        this.logger.error(`Error processing harvest record ${record.id}:`, err?.stack || err?.message || err);
        results.push({
          id: record.id,
          status: 'ERROR',
          httpStatus: 400,
          message: err?.message || 'Gagal menyimpan transaksi ke database.',
        });
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

  private async resolveTphAndBlock(item: HarvestPayloadItemDto): Promise<{
    tphId: string;
    blockId: string;
  }> {
    // 1. Cari TPH yang cocok
    let foundTph: TPH | null = null;
    if (item.tphId && UUID_REGEX.test(item.tphId)) {
      foundTph = await this.tphRepo.findOne({ where: { id: item.tphId } });
    }

    if (!foundTph && item.tphId) {
      // Coba cocokkan dengan nomor TPH misal "TPH-01" atau QR Code
      const cleanNum = item.tphId.includes('TPH-01') ? 'TPH-01' : item.tphId.includes('TPH-02') ? 'TPH-02' : item.tphId;
      foundTph = await this.tphRepo.findOne({
        where: [{ tphNumber: cleanNum }, { qrCodeIdentifier: item.tphId }],
      });
    }

    if (!foundTph) {
      const fallbackList = await this.tphRepo.find({ order: { tphNumber: 'ASC' }, take: 1 });
      foundTph = fallbackList[0] || null;
    }

    // 2. Cari Blok yang cocok
    let foundBlock: Block | null = null;
    if (item.blockId && UUID_REGEX.test(item.blockId)) {
      foundBlock = await this.blockRepo.findOne({ where: { id: item.blockId } });
    }

    if (!foundBlock && item.blockId) {
      const cleanCode = item.blockId.replace(/[^a-zA-Z0-9]/g, '');
      foundBlock = await this.blockRepo.findOne({
        where: [{ blockCode: item.blockId }, { blockCode: cleanCode }],
      });
    }

    if (!foundBlock && foundTph?.blockId) {
      foundBlock = await this.blockRepo.findOne({ where: { id: foundTph.blockId } });
    }

    if (!foundBlock) {
      const fallbackList = await this.blockRepo.find({ order: { blockCode: 'ASC' }, take: 1 });
      foundBlock = fallbackList[0] || null;
    }

    return {
      tphId: foundTph?.id || 'a1111111-1111-1111-1111-111111111111',
      blockId: foundBlock?.id || foundTph?.blockId || 'b1111111-1111-1111-1111-111111111111',
    };
  }

  private async resolveUserId(authenticatedUser?: SyncAuthenticatedUser | null, itemUserId?: string): Promise<string> {
    if (authenticatedUser?.id && UUID_REGEX.test(authenticatedUser.id)) {
      return authenticatedUser.id;
    }
    if (itemUserId && UUID_REGEX.test(itemUserId)) {
      const user = await this.userRepo.findOne({ where: { id: itemUserId } });
      if (user) return user.id;
    }
    const fallbackList = await this.userRepo.find({ order: { fullName: 'ASC' }, take: 1 });
    return fallbackList[0]?.id || 'e4444444-4444-4444-4444-444444444444';
  }

  private async resolveSingleHarvest(
    item: HarvestPayloadItemDto,
    deviceId: string,
    authenticatedUser?: SyncAuthenticatedUser | null,
  ) {
    const userRoleWeight =
      authenticatedUser?.roleWeight ||
      (item as HarvestPayloadWithRoleWeight).userRoleWeight ||
      1;
    const incomingScore = this.calculatePriorityScore(
      userRoleWeight,
      item.clientTimestampMs,
    );

    const existing = await this.harvestLogRepo.findOne({
      where: { id: item.id },
    });

    const { tphId, blockId } = await this.resolveTphAndBlock(item);
    const userId = await this.resolveUserId(authenticatedUser, item.userId);

    // Skenario 1: Record Baru (Belum ada di database)
    if (!existing) {
      const newHarvest = this.harvestLogRepo.create({
        id: item.id,
        tphId,
        blockId,
        userId,
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
          ? {
              type: 'Point',
              coordinates: [item.location.longitude, item.location.latitude],
            }
          : null,
      });

      await this.harvestLogRepo.save(newHarvest);

      await this.logAuditTrail({
        harvestLogId: item.id,
        userId,
        userRoleWeight,
        clientTimestampMs: item.clientTimestampMs.toString(),
        calculatedPriorityScore: incomingScore.toString(),
        syncAction: 'INSERT',
        payloadSnapshot: item,
        conflictReason: 'New Record Created from Mobile Sync',
        deviceInfo: deviceId,
      });

      return {
        id: item.id,
        status: 'ACCEPTED_NEW',
        httpStatus: 201,
        message: 'Record baru panen berhasil disimpan dan tersinkronisasi.',
        winningScore: incomingScore.toString(),
      };
    }

    // Skenario 2: Benturan Data / Update - Evaluasi Priority Score
    const existingScore = BigInt(existing.priorityScore);

    if (incomingScore > existingScore) {
      // Incoming score lebih tinggi (Peran lebih tinggi atau timestamp lebih baru pada peran yang sama)
      existing.janjangCount = item.janjangCount;
      existing.brondolanWeightKg =
        item.brondolanWeightKg || existing.brondolanWeightKg;
      existing.mentahCount = item.mentahCount ?? existing.mentahCount;
      existing.masakCount = item.masakCount ?? existing.masakCount;
      existing.lewatMasakCount =
        item.lewatMasakCount ?? existing.lewatMasakCount;
      existing.tangkaiPanjangCount =
        item.tangkaiPanjangCount ?? existing.tangkaiPanjangCount;
      existing.clientTimestampMs = item.clientTimestampMs.toString();
      existing.priorityScore = incomingScore.toString();
      existing.idempotencyKey = item.idempotencyKey;

      await this.harvestLogRepo.save(existing);

      await this.logAuditTrail({
        harvestLogId: item.id,
        userId,
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
        message:
          'Record berhasil di-overwrite berdasarkan priority score otoritas lebih tinggi.',
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
        userId: existing.userId,
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
        message:
          'Data transaksi ditolak karena data di server memiliki prioritas lebih tinggi.',
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
