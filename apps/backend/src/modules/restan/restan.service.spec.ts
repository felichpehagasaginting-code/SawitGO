import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RestanService } from './restan.service';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { RestanTracker } from './restan-tracker.entity';

describe('RestanService - FFA Degradation & Warning Tests (Fase 4)', () => {
  let service: RestanService;

  const mockHarvestRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockRestanRepo = {
    find: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestanService,
        {
          provide: getRepositoryToken(HarvestLog),
          useValue: mockHarvestRepo,
        },
        {
          provide: getRepositoryToken(RestanTracker),
          useValue: mockRestanRepo,
        },
      ],
    }).compile();

    service = module.get<RestanService>(RestanService);
  });

  it('harus mendeteksi stage RESTAN_OVERDUE dan menghitung FFA dengan benar saat t > 24 jam', async () => {
    const now = Date.now();
    const twentyEightHoursAgo = now - 28 * 60 * 60 * 1000;

    mockHarvestRepo.find.mockResolvedValue([
      {
        id: 'harv-restan-01',
        status: 'PENDING',
        janjangCount: 100,
        clientTimestampMs: BigInt(twentyEightHoursAgo),
        createdAt: new Date(twentyEightHoursAgo),
        tph: {
          tphNumber: 'TPH-01',
          latitude: 0.53775,
          longitude: 101.4452,
          block: { blockCode: 'B012' },
        },
      },
    ]);

    const result = await service.calculateRestanWarnings();

    expect(result.totalWarnings).toBe(1);
    expect(result.criticalRestanCount).toBe(1);
    const item = result.warningList[0];
    expect(item.stage).toBe('RESTAN_OVERDUE');
    // Formula: 1.50 + 0.15 * (28 - 24) = 2.10%
    expect(item.estimatedFfaPercentage).toBeCloseTo(2.1, 1);
  });

  it('harus mendeteksi stage WARNING_12H saat 12 <= t < 20 jam', async () => {
    const now = Date.now();
    const fourteenHoursAgo = now - 14 * 60 * 60 * 1000;

    mockHarvestRepo.find.mockResolvedValue([
      {
        id: 'harv-warn-02',
        status: 'PENDING',
        janjangCount: 85,
        clientTimestampMs: BigInt(fourteenHoursAgo),
        createdAt: new Date(fourteenHoursAgo),
        tph: {
          tphNumber: 'TPH-02',
          latitude: 0.5369,
          longitude: 101.4461,
          block: { blockCode: 'B012' },
        },
      },
    ]);

    const result = await service.calculateRestanWarnings();

    expect(result.totalWarnings).toBe(1);
    expect(result.criticalRestanCount).toBe(0);
    expect(result.warningList[0].stage).toBe('WARNING_12H');
  });
});
