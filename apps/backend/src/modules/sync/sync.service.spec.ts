import { SyncService } from './sync.service';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { SyncAuditTrail } from './sync-audit-trail.entity';
import { Repository } from 'typeorm';

describe('SyncService - Conflict Resolution Tests', () => {
  let syncService: SyncService;

  beforeEach(() => {
    syncService = new SyncService(
      null as unknown as Repository<HarvestLog>,
      null as unknown as Repository<SyncAuditTrail>,
    );
  });

  it('harus menghitung Priority Score secara benar dan deterministik', () => {
    // Formula: (Role Weight * 1.000.000.000.000) + Timestamp
    const kraniScore = syncService.calculatePriorityScore(1, 1723850000000); // Krani @ 08:00
    const asistenScore = syncService.calculatePriorityScore(3, 1723855400000); // Asisten @ 09:30
    const managerScore = syncService.calculatePriorityScore(5, 1723850000000); // Manager @ 08:00

    expect(kraniScore).toBe(1_000_000_000_000n + 1723850000000n);
    expect(asistenScore).toBe(3_000_000_000_000n + 1723855400000n);
    expect(managerScore).toBe(5_000_000_000_000n + 1723850000000n);

    // Verifikasi perbandingan konsensus hirarki
    expect(asistenScore > kraniScore).toBe(true);
    expect(managerScore > asistenScore).toBe(true);
  });

  it('harus memenangkan data yang lebih mutakhir jika role weight sama (Tie-Breaker)', () => {
    const mandorRecordA = syncService.calculatePriorityScore(2, 1723850000000); // 08:00
    const mandorRecordB = syncService.calculatePriorityScore(2, 1723850060000); // 08:01 (baru)

    expect(mandorRecordB > mandorRecordA).toBe(true);
  });
});
