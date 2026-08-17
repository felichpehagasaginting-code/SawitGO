import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from '../blocks/block.entity';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { SyncAuditTrail } from '../sync/sync-audit-trail.entity';
import { TPH } from '../tph/tph.entity';
import { RestanService } from '../restan/restan.service';

interface KpiTotalsRow {
  total_janjang: string;
  total_brondolan_kg: string;
  total_estimated_kg: string;
  total_transactions: string;
}

interface StatusCountRow {
  status: string;
  cnt: string;
}

interface TrendRow {
  date: string;
  transactions: string;
  total_janjang: string;
  total_brondolan_kg: string;
  total_estimated_kg: string;
}

interface EudrBlockRow {
  id: string;
  block_code: string;
  planting_year: number;
  palm_variety: string;
  total_palms: number;
  area_hectares: string | number;
  estate_code: string | null;
  afdeling_code: string | null;
  geojson_boundary: string | null;
}

interface TphStatusRow {
  harvest_id: string;
  tph_id: string;
  block_id: string;
  janjang_count: string;
  brondolan_weight_kg: string;
  estimated_weight_kg: string;
  status: string;
  client_timestamp_ms: string;
  tph_number: string;
  latitude: string;
  longitude: string;
  qr_code_identifier: string;
  block_code: string;
}

export interface VolumeTrendDay {
  date: string;
  transactions: number;
  totalJanjang: number;
  totalBrondolanKg: number;
  estimatedTonaseKg: number;
  tonaseTon: number;
  bjrAvgKg: number;
}

export interface ActivityFeedItem {
  id: string;
  createdAt: string;
  action: string;
  roleWeight: number;
  userName: string;
  roleName: string | null;
  blockCode: string | null;
  tphNumber: string | null;
  janjangCount: number | null;
  priorityScore: string;
  conflictReason: string | null;
}

export interface TphStatusItem {
  tphId: string;
  tphNumber: string;
  blockCode: string;
  blockId: string;
  latitude: number;
  longitude: number;
  qrCode: string;
  latest: {
    harvestId: string;
    janjangCount: number;
    brondolanWeightKg: number;
    estimatedWeightKg: number;
    elapsedHours: number;
    status: string;
    stage: string;
    ffaEstimate: number;
  } | null;
}

@Injectable()
export class AnalyticsService {
  private readonly BJR_KG = 18.5;

  constructor(
    @InjectRepository(Block)
    private blockRepo: Repository<Block>,
    @InjectRepository(HarvestLog)
    private harvestRepo: Repository<HarvestLog>,
    @InjectRepository(SyncAuditTrail)
    private auditRepo: Repository<SyncAuditTrail>,
    @InjectRepository(TPH)
    private tphRepo: Repository<TPH>,
    private restanService: RestanService,
  ) {}

  async getEudrGeoJsonFeatureCollection() {
    const rawBlocks = await this.blockRepo.query<EudrBlockRow[]>(`
      SELECT 
        b.id,
        b.block_code,
        b.planting_year,
        b.palm_variety,
        b.total_palms,
        b.area_hectares,
        e.code as estate_code,
        a.code as afdeling_code,
        ST_AsGeoJSON(b.boundary) as geojson_boundary
      FROM blocks b
      LEFT JOIN afdelings a ON a.id = b.afdeling_id
      LEFT JOIN estates e ON e.id = a.estate_id
    `);

    const features = rawBlocks.map((b) => ({
      type: 'Feature',
      id: b.id,
      properties: {
        estateCode: b.estate_code || 'EST-CWE-01',
        afdelingCode: b.afdeling_code || 'AFD-A',
        blockCode: b.block_code,
        plantingYear: b.planting_year,
        palmVariety: b.palm_variety,
        totalPalms: b.total_palms,
        areaHectares: b.area_hectares,
        isCertifiedRSPO: true,
        isCertifiedISPO: true,
        complianceStandard: 'EUDR Regulation No 2023/1115 (SRID 4326)',
      },
      geometry: b.geojson_boundary
        ? (JSON.parse(b.geojson_boundary) as unknown)
        : null,
    }));

    return {
      type: 'FeatureCollection',
      features,
    };
  }

  async getVolumeTrend(days: number): Promise<VolumeTrendDay[]> {
    const safeDays = Math.min(Math.max(days || 7, 1), 90);
    const rows = await this.harvestRepo.query<TrendRow[]>(
      `
      SELECT
        to_char(harvest_date, 'YYYY-MM-DD') AS date,
        COUNT(id)::int AS transactions,
        COALESCE(SUM(janjang_count), 0)::bigint AS total_janjang,
        COALESCE(SUM(brondolan_weight_kg), 0)::numeric AS total_brondolan_kg,
        COALESCE(SUM(estimated_weight_kg), 0)::numeric AS total_estimated_kg
      FROM harvest_logs
      WHERE harvest_date >= CURRENT_DATE - ($1::int - 1)
      GROUP BY harvest_date
      ORDER BY harvest_date ASC
      `,
      [safeDays],
    );

    const byDate = new Map<string, TrendRow>();
    for (const row of rows) {
      byDate.set(row.date, row);
    }

    const result: VolumeTrendDay[] = [];
    for (let i = safeDays - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = this.toDateKey(d);
      const row = byDate.get(dateKey);

      if (!row) {
        result.push({
          date: dateKey,
          transactions: 0,
          totalJanjang: 0,
          totalBrondolanKg: 0,
          estimatedTonaseKg: 0,
          tonaseTon: 0,
          bjrAvgKg: 0,
        });
        continue;
      }

      const totalJanjang = Number(row.total_janjang) || 0;
      const totalEstimatedKg = Number(row.total_estimated_kg) || 0;
      result.push({
        date: dateKey,
        transactions: Number(row.transactions) || 0,
        totalJanjang,
        totalBrondolanKg: Number(row.total_brondolan_kg) || 0,
        estimatedTonaseKg: totalEstimatedKg,
        tonaseTon: Math.round((totalEstimatedKg / 1000) * 10) / 10,
        bjrAvgKg:
          totalJanjang > 0
            ? Math.round((totalEstimatedKg / totalJanjang) * 100) / 100
            : 0,
      });
    }

    return result;
  }

  async getActivityFeed(
    limit: number,
    category: 'all' | 'conflict',
  ): Promise<ActivityFeedItem[]> {
    const safeLimit = Math.min(Math.max(limit || 15, 1), 100);

    const qb = this.auditRepo
      .createQueryBuilder('a')
      .leftJoinAndSelect('a.user', 'u')
      .leftJoinAndSelect('a.harvestLog', 'h')
      .leftJoinAndSelect('h.tph', 't')
      .leftJoinAndSelect('t.block', 'b')
      .orderBy('a.createdAt', 'DESC')
      .take(safeLimit);

    if (category === 'conflict') {
      qb.andWhere('a.syncAction IN (:...actions)', {
        actions: ['REJECT_STALE', 'UPDATE_OVERWRITE'],
      });
    }

    const rows = await qb.getMany();

    return rows.map((r) => ({
      id: r.id,
      createdAt: r.createdAt.toISOString(),
      action: r.syncAction,
      roleWeight: r.userRoleWeight,
      userName: r.user?.fullName ?? 'Pengguna Tidak Dikenal',
      roleName: r.user?.role?.roleName ?? null,
      blockCode: r.harvestLog?.tph?.block?.blockCode ?? null,
      tphNumber: r.harvestLog?.tph?.tphNumber ?? null,
      janjangCount: r.harvestLog?.janjangCount ?? null,
      priorityScore: r.calculatedPriorityScore,
      conflictReason: r.conflictReason,
    }));
  }

  async getTphStatus(): Promise<TphStatusItem[]> {
    const rows = await this.harvestRepo.query<TphStatusRow[]>(`
      SELECT DISTINCT ON (h.tph_id)
        h.id AS harvest_id,
        h.tph_id,
        h.block_id,
        h.janjang_count,
        h.brondolan_weight_kg,
        h.estimated_weight_kg,
        h.status,
        h.client_timestamp_ms,
        t.tph_number,
        t.latitude,
        t.longitude,
        t.qr_code_identifier,
        b.block_code
      FROM harvest_logs h
      JOIN tph t ON t.id = h.tph_id
      JOIN blocks b ON b.id = t.block_id
      ORDER BY h.tph_id, h.client_timestamp_ms DESC
    `);

    const latestByTph = new Map<string, TphStatusRow>();
    for (const row of rows) {
      if (!latestByTph.has(row.tph_id)) {
        latestByTph.set(row.tph_id, row);
      }
    }

    const allTphs = await this.tphRepo.find({ relations: { block: true } });
    const now = Date.now();

    return allTphs.map((tph) => {
      const row = latestByTph.get(tph.id);
      if (!row) {
        return {
          tphId: tph.id,
          tphNumber: tph.tphNumber,
          blockCode: tph.block?.blockCode ?? 'UNKNOWN',
          blockId: tph.blockId,
          latitude: Number(tph.latitude),
          longitude: Number(tph.longitude),
          qrCode: tph.qrCodeIdentifier,
          latest: null,
        };
      }

      const elapsedHours = (now - Number(row.client_timestamp_ms)) / 3600000;
      const { stage, estimatedFfa } = this.classifyRestan(elapsedHours);

      return {
        tphId: tph.id,
        tphNumber: row.tph_number,
        blockCode: row.block_code,
        blockId: row.block_id,
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
        qrCode: row.qr_code_identifier,
        latest: {
          harvestId: row.harvest_id,
          janjangCount: Number(row.janjang_count) || 0,
          brondolanWeightKg: Number(row.brondolan_weight_kg) || 0,
          estimatedWeightKg: Number(row.estimated_weight_kg) || 0,
          elapsedHours: Math.round(elapsedHours * 10) / 10,
          status: row.status,
          stage,
          ffaEstimate: estimatedFfa,
        },
      };
    });
  }

  async getExecutiveKpiMetrics() {
    const totalRow = await this.getTotalsForRange(0, 7);
    const previousRow = await this.getTotalsForRange(7, 7);
    const statusRows = await this.harvestRepo.query<StatusCountRow[]>(`
      SELECT status, COUNT(id)::bigint AS cnt
      FROM harvest_logs
      GROUP BY status
    `);

    const totalJanjang = Number(totalRow?.total_janjang) || 0;
    const totalBrondolan = Number(totalRow?.total_brondolan_kg) || 0;
    const totalEstimatedKg = Number(totalRow?.total_estimated_kg) || 0;
    const totalTransactions = Number(totalRow?.total_transactions) || 0;

    const previousJanjang = Number(previousRow?.total_janjang) || 0;
    const janjangTrendPercent =
      previousJanjang > 0
        ? Math.round(
            ((totalJanjang - previousJanjang) / previousJanjang) * 1000,
          ) / 10
        : 0;

    const totalCount = statusRows.reduce((acc, r) => acc + Number(r.cnt), 0);
    const syncedCount =
      statusRows.find((r) => r.status === 'SYNCED')?.cnt !== undefined
        ? Number(statusRows.find((r) => r.status === 'SYNCED')?.cnt) || 0
        : 0;
    const slaCompliancePercent =
      totalCount > 0 ? Math.round((syncedCount / totalCount) * 1000) / 10 : 100;

    const restanWarnings = await this.restanService.calculateRestanWarnings();
    const averageFfa =
      restanWarnings.warningList.length > 0
        ? Math.round(
            (restanWarnings.warningList.reduce(
              (acc, w) => acc + Number(w.estimatedFfaPercentage),
              0,
            ) /
              restanWarnings.warningList.length) *
              100,
          ) / 100
        : 1.42;

    return {
      totalJanjang,
      totalBrondolanKg: totalBrondolan,
      estimatedTonaseTon: Math.round((totalEstimatedKg / 1000) * 100) / 100,
      avgBjrKg:
        totalJanjang > 0
          ? Math.round((totalEstimatedKg / totalJanjang) * 100) / 100
          : this.BJR_KG,
      slaCompliancePercent,
      janjangTrendPercent,
      averageFfaPercentage: averageFfa,
      restanOverdueCount: restanWarnings.criticalRestanCount,
      totalPendingCount: restanWarnings.totalWarnings,
      totalTransactions,
      activeP2pSyncNodes: 8,
    };
  }

  private async getTotalsForRange(
    offsetDays: number,
    windowDays: number,
  ): Promise<KpiTotalsRow | undefined> {
    const rows =
      offsetDays === 0
        ? await this.harvestRepo.query<KpiTotalsRow[]>(
            `
            SELECT
              COALESCE(SUM(janjang_count), 0)::bigint AS total_janjang,
              COALESCE(SUM(brondolan_weight_kg), 0)::numeric AS total_brondolan_kg,
              COALESCE(SUM(estimated_weight_kg), 0)::numeric AS total_estimated_kg,
              COUNT(id)::bigint AS total_transactions
            FROM harvest_logs
            WHERE harvest_date >= CURRENT_DATE - ($1::int - 1)
            `,
            [windowDays],
          )
        : await this.harvestRepo.query<KpiTotalsRow[]>(
            `
            SELECT
              COALESCE(SUM(janjang_count), 0)::bigint AS total_janjang,
              COALESCE(SUM(brondolan_weight_kg), 0)::numeric AS total_brondolan_kg,
              COALESCE(SUM(estimated_weight_kg), 0)::numeric AS total_estimated_kg,
              COUNT(id)::bigint AS total_transactions
            FROM harvest_logs
            WHERE harvest_date >= CURRENT_DATE - ($1::int + $2::int - 1)
              AND harvest_date < CURRENT_DATE - $1::int
            `,
            [offsetDays, windowDays],
          );
    return rows?.[0];
  }

  private classifyRestan(elapsedHours: number): {
    stage: string;
    estimatedFfa: number;
  } {
    if (elapsedHours >= 24) {
      return {
        stage: 'RESTAN_OVERDUE',
        estimatedFfa:
          Math.round((1.5 + 0.15 * (elapsedHours - 24)) * 100) / 100,
      };
    }
    if (elapsedHours >= 20) {
      return { stage: 'CRITICAL_20H', estimatedFfa: 1.8 };
    }
    if (elapsedHours >= 12) {
      return { stage: 'WARNING_12H', estimatedFfa: 1.45 };
    }
    return { stage: 'NORMAL', estimatedFfa: 1.2 };
  }

  private toDateKey(d: Date): string {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
