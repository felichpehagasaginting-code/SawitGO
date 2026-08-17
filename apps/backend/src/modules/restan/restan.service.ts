import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { RestanTracker } from './restan-tracker.entity';

export interface RestanWarning {
  harvestId: string;
  tphNumber: string;
  blockCode: string;
  janjangCount: number;
  elapsedHours: number;
  stage: string;
  estimatedFfaPercentage: number;
  latitude: number;
  longitude: number;
}

export interface RestanWarningsResult {
  totalWarnings: number;
  criticalRestanCount: number;
  warningList: RestanWarning[];
}

@Injectable()
export class RestanService {
  constructor(
    @InjectRepository(HarvestLog)
    private harvestRepo: Repository<HarvestLog>,
    @InjectRepository(RestanTracker)
    private restanRepo: Repository<RestanTracker>,
  ) {}

  async calculateRestanWarnings(): Promise<RestanWarningsResult> {
    // Ambil seluruh panen yang belum diangkut (status PENDING)
    const pendingHarvests = await this.harvestRepo.find({
      where: { status: 'PENDING' },
      relations: { tph: { block: true } },
    });

    const now = Date.now();
    const warnings: RestanWarning[] = [];

    for (const h of pendingHarvests) {
      const harvestTimestamp =
        Number(h.clientTimestampMs) || h.createdAt.getTime();
      const elapsedHours = (now - harvestTimestamp) / (1000 * 60 * 60);

      let stage = 'NORMAL';
      let estimatedFfa = 1.2; // Standar TBS segar

      if (elapsedHours >= 24) {
        stage = 'RESTAN_OVERDUE';
        // Formula FFA: 1.50% + 0.15% per jam setelah 24 jam
        estimatedFfa = Number((1.5 + 0.15 * (elapsedHours - 24)).toFixed(2));
      } else if (elapsedHours >= 20) {
        stage = 'CRITICAL_20H';
        estimatedFfa = 1.8;
      } else if (elapsedHours >= 12) {
        stage = 'WARNING_12H';
        estimatedFfa = 1.45;
      }

      if (stage !== 'NORMAL') {
        warnings.push({
          harvestId: h.id,
          tphNumber: h.tph?.tphNumber || 'TPH-UNKNOWN',
          blockCode: h.tph?.block?.blockCode || 'B012',
          janjangCount: h.janjangCount,
          elapsedHours: Number(elapsedHours.toFixed(1)),
          stage,
          estimatedFfaPercentage: estimatedFfa,
          latitude: h.tph?.latitude,
          longitude: h.tph?.longitude,
        });
      }
    }

    return {
      totalWarnings: warnings.length,
      criticalRestanCount: warnings.filter((w) => w.stage === 'RESTAN_OVERDUE')
        .length,
      warningList: warnings,
    };
  }

  async markAsPickedUp(harvestId: string) {
    const harvest = await this.harvestRepo.findOne({
      where: { id: harvestId },
    });
    if (!harvest) {
      return { success: false, message: 'Data panen tidak ditemukan' };
    }
    harvest.status = 'SYNCED';
    await this.harvestRepo.save(harvest);
    return { success: true, message: 'Buah telah diangkut ke PKS' };
  }
}
