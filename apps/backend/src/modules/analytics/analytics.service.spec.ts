import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { Block } from '../blocks/block.entity';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { SyncAuditTrail } from '../sync/sync-audit-trail.entity';
import { TPH } from '../tph/tph.entity';
import { RestanService } from '../restan/restan.service';

describe('AnalyticsService - Dashboard Integration Tests (Fase 4)', () => {
  let service: AnalyticsService;

  const mockBlockRepo = { query: jest.fn() };
  const mockHarvestRepo = { query: jest.fn() };
  const mockAuditRepo = { query: jest.fn(), createQueryBuilder: jest.fn() };
  const mockTphRepo = { find: jest.fn() };
  const mockRestanService = { calculateRestanWarnings: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: getRepositoryToken(Block), useValue: mockBlockRepo },
        { provide: getRepositoryToken(HarvestLog), useValue: mockHarvestRepo },
        {
          provide: getRepositoryToken(SyncAuditTrail),
          useValue: mockAuditRepo,
        },
        { provide: getRepositoryToken(TPH), useValue: mockTphRepo },
        { provide: RestanService, useValue: mockRestanService },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('getVolumeTrend harus mengisi hari yang tidak punya data dengan 0 dan menghitung tonase', async () => {
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const yesterday = new Date(today.getTime() - 86400000);
    const yesterdayKey = yesterday.toISOString().slice(0, 10);

    mockHarvestRepo.query.mockResolvedValue([
      {
        date: todayKey,
        transactions: '5',
        total_janjang: '500',
        total_brondolan_kg: '120.5',
        total_estimated_kg: '9370.5',
      },
    ]);

    const result = await service.getVolumeTrend(7);

    expect(result).toHaveLength(7);
    const todayItem = result.find((d) => d.date === todayKey);
    expect(todayItem?.totalJanjang).toBe(500);
    expect(todayItem?.tonaseTon).toBeCloseTo(9.4, 1);
    // Hari tanpa data harus diisi 0
    const emptyItem = result.find((d) => d.date === yesterdayKey);
    expect(emptyItem?.totalJanjang).toBe(0);
    expect(emptyItem?.tonaseTon).toBe(0);
  });

  it('getActivityFeed kategori conflict hanya mengambil REJECT_STALE / UPDATE_OVERWRITE', async () => {
    const qbMock = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([
        {
          id: 'audit-1',
          createdAt: new Date(),
          syncAction: 'REJECT_STALE',
          userRoleWeight: 1,
          calculatedPriorityScore: '2723850000000',
          conflictReason: 'Data stale',
          user: { fullName: 'Dika Prasetyawan', role: { roleName: 'KRANI' } },
          harvestLog: {
            janjangCount: 100,
            tph: { tphNumber: 'TPH-01', block: { blockCode: 'B012' } },
          },
        },
      ]),
    };
    mockAuditRepo.createQueryBuilder.mockReturnValue(qbMock);

    const result = await service.getActivityFeed(15, 'conflict');

    expect(qbMock.andWhere).toHaveBeenCalledWith(
      'a.syncAction IN (:...actions)',
      {
        actions: ['REJECT_STALE', 'UPDATE_OVERWRITE'],
      },
    );
    expect(result).toHaveLength(1);
    expect(result[0].action).toBe('REJECT_STALE');
    expect(result[0].userName).toBe('Dika Prasetyawan');
    expect(result[0].blockCode).toBe('B012');
  });

  it('getTphStatus harus menandai TPH tanpa panen dengan latest null dan menghitung stage restan', async () => {
    const now = Date.now();
    const twentySixHoursAgo = now - 26 * 60 * 60 * 1000;

    mockHarvestRepo.query.mockResolvedValue([
      {
        harvest_id: 'harv-1',
        tph_id: 'tph-1',
        block_id: 'block-1',
        janjang_count: '140',
        brondolan_weight_kg: '48.5',
        estimated_weight_kg: '2638.5',
        status: 'PENDING',
        client_timestamp_ms: String(twentySixHoursAgo),
        tph_number: 'TPH-01',
        latitude: '0.53775',
        longitude: '101.4452',
        qr_code_identifier: 'QR-CWE-EST01-B012-TPH01',
        block_code: 'B012',
      },
    ]);

    mockTphRepo.find.mockResolvedValue([
      {
        id: 'tph-1',
        blockId: 'block-1',
        tphNumber: 'TPH-01',
        latitude: 0.53775,
        longitude: 101.4452,
        qrCodeIdentifier: 'QR-CWE-EST01-B012-TPH01',
        block: { blockCode: 'B012' },
      },
      {
        id: 'tph-2',
        blockId: 'block-1',
        tphNumber: 'TPH-02',
        latitude: 0.5369,
        longitude: 101.4461,
        qrCodeIdentifier: 'QR-CWE-EST01-B012-TPH02',
        block: { blockCode: 'B012' },
      },
    ]);

    const result = await service.getTphStatus();

    expect(result).toHaveLength(2);
    expect(result[0].latest?.stage).toBe('RESTAN_OVERDUE');
    expect(result[0].latest?.elapsedHours).toBeGreaterThanOrEqual(26);
    expect(result[1].latest).toBeNull();
  });

  it('getExecutiveKpiMetrics harus menghitung SLA compliance dan restan overdue dari data riil', async () => {
    mockHarvestRepo.query
      .mockResolvedValueOnce([
        {
          total_janjang: '5000',
          total_brondolan_kg: '1200',
          total_estimated_kg: '93700',
          total_transactions: '100',
        },
      ])
      .mockResolvedValueOnce([
        {
          total_janjang: '4200',
          total_brondolan_kg: '980',
          total_estimated_kg: '78500',
          total_transactions: '84',
        },
      ])
      .mockResolvedValueOnce([
        { status: 'PENDING', cnt: '40' },
        { status: 'SYNCED', cnt: '60' },
      ]);

    mockRestanService.calculateRestanWarnings.mockResolvedValue({
      totalWarnings: 5,
      criticalRestanCount: 2,
      warningList: [
        { estimatedFfaPercentage: 2.1 },
        { estimatedFfaPercentage: 1.8 },
      ],
    });

    const result = await service.getExecutiveKpiMetrics();

    expect(result.totalJanjang).toBe(5000);
    expect(result.estimatedTonaseTon).toBeCloseTo(93.7, 1);
    expect(result.slaCompliancePercent).toBe(60);
    expect(result.janjangTrendPercent).toBeCloseTo(19, 0);
    expect(result.restanOverdueCount).toBe(2);
    expect(result.totalTransactions).toBe(100);
  });
});
