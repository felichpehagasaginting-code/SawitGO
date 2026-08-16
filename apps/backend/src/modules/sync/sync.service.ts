import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { SyncAuditTrail } from './sync-audit-trail.entity';
import { BatchSyncDto, HarvestPayloadItemDto } from './dto/batch-sync.dto';

@Injectable()
export class SyncService {
  constructor(
    @InjectRepository(HarvestLog)
    private harvestLogRepo: Repository<HarvestLog>,
    @InjectRepository(SyncAuditTrail)
    private syncAuditTrailRepo: Repository<SyncAuditTrail>,
  ) {}

  async processBatch(batchDto: BatchSyncDto) {
    const results: any[] = [];
    let successCount = 0;
    let conflictCount = 0;

    for (const record of batchDto.records) {
      const result = await this.processSingleRecord(record, batchDto.deviceId);
      results.push(result);
      if (result.status === 'ACCEPTED_NEW' || result.status === 'ACCEPTED_OVERWRITE' || result.status === 'IGNORED_IDEMPOTENT') {
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

  private async processSingleRecord(item: HarvestPayloadItemDto, deviceId: string) {
    // Sesuai Fase 1, scaffolding kerangka integrasi DTO dan Entity
    const existing = await this.harvestLogRepo.findOne({ where: { id: item.id } });

    if (!existing) {
      return {
        id: item.id,
        status: 'ACCEPTED_NEW',
        httpStatus: 201,
        message: 'Record baru berhasil diterima.',
        winningScore: item.priorityScore,
      };
    }

    const incomingScore = BigInt(item.priorityScore);
    const existingScore = BigInt(existing.priorityScore);

    if (incomingScore > existingScore) {
      return {
        id: item.id,
        status: 'ACCEPTED_OVERWRITE',
        httpStatus: 200,
        message: 'Record berhasil di-overwrite berdasarkan priority score yang lebih tinggi.',
        winningScore: Number(incomingScore),
      };
    } else if (incomingScore === existingScore) {
      return {
        id: item.id,
        status: 'IGNORED_IDEMPOTENT',
        httpStatus: 200,
        message: 'Transaksi duplikat diabaikan (Idempotent).',
        winningScore: Number(existingScore),
      };
    } else {
      return {
        id: item.id,
        status: 'REJECTED_STALE',
        httpStatus: 409,
        message: 'Data kiriman ditolak karena data di server memiliki prioritas lebih tinggi.',
        winningScore: Number(existingScore),
      };
    }
  }
}
