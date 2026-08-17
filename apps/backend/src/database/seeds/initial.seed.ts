import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { Role } from '../../modules/roles/role.entity';
import { User } from '../../modules/users/user.entity';
import { Estate } from '../../modules/estates/estate.entity';
import { Afdeling } from '../../modules/estates/afdeling.entity';
import { Block } from '../../modules/blocks/block.entity';
import { TPH } from '../../modules/tph/tph.entity';
import { HarvestLog } from '../../modules/harvest/harvest-log.entity';
import { SyncAuditTrail } from '../../modules/sync/sync-audit-trail.entity';

interface SeedUserWithWeight {
  id: string;
  roleId: number;
  roleWeight: number;
  fullName: string;
}

@Injectable()
export class InitialSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(InitialSeedService.name);

  private readonly BJR_KG = 18.5;

  constructor(
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Estate)
    private estateRepo: Repository<Estate>,
    @InjectRepository(Afdeling)
    private afdelingRepo: Repository<Afdeling>,
    @InjectRepository(Block)
    private blockRepo: Repository<Block>,
    @InjectRepository(TPH)
    private tphRepo: Repository<TPH>,
    @InjectRepository(HarvestLog)
    private harvestRepo: Repository<HarvestLog>,
    @InjectRepository(SyncAuditTrail)
    private auditRepo: Repository<SyncAuditTrail>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedRoles();
    await this.seedMasterDataAndUsers();
    await this.seedHarvestLogs();
    await this.seedSyncAuditTrails();
  }

  private async seedRoles() {
    const rolesData = [
      {
        id: 1,
        roleName: 'MANAGER',
        roleWeight: 5,
        description: 'Estate Manager - Otoritas Tertinggi Kebun',
      },
      {
        id: 2,
        roleName: 'ASKEP',
        roleWeight: 4,
        description: 'Asisten Kepala / Kepala Rayon',
      },
      {
        id: 3,
        roleName: 'ASISTEN',
        roleWeight: 3,
        description: 'Asisten Afdeling Lapangan',
      },
      {
        id: 4,
        roleName: 'MANDOR',
        roleWeight: 2,
        description: 'Mandor Panen Lapangan',
      },
      {
        id: 5,
        roleName: 'KRANI',
        roleWeight: 1,
        description: 'Krani TPH / Pencatat Hasil Panen',
      },
    ];

    for (const r of rolesData) {
      const existing = await this.roleRepo.findOne({
        where: { roleName: r.roleName },
      });
      if (!existing) {
        const role = this.roleRepo.create(r);
        await this.roleRepo.save(role);
        this.logger.log(`Seeded Role: ${r.roleName} (Weight: ${r.roleWeight})`);
      }
    }
  }

  private async seedMasterDataAndUsers() {
    // 1. Seed Estate CWE
    let estate = await this.estateRepo.findOne({
      where: { code: 'EST-CWE-01' },
    });
    if (!estate) {
      estate = this.estateRepo.create({
        code: 'EST-CWE-01',
        name: 'Kebun Percontohan Politeknik Citra Widya Edukasi',
        totalAreaHectares: 120.5,
      });
      estate = await this.estateRepo.save(estate);
      this.logger.log('Seeded Estate: EST-CWE-01');
    }

    // 2. Seed Afdeling Alpha
    let afdeling = await this.afdelingRepo.findOne({
      where: { code: 'AFD-A', estateId: estate.id },
    });
    if (!afdeling) {
      afdeling = this.afdelingRepo.create({
        estateId: estate.id,
        code: 'AFD-A',
        name: 'Afdeling Alpha',
      });
      afdeling = await this.afdelingRepo.save(afdeling);
      this.logger.log('Seeded Afdeling: AFD-A');
    }

    // 3. Seed Block B012 (EUDR Polygon Compliant)
    let block = await this.blockRepo.findOne({
      where: { blockCode: 'B012', afdelingId: afdeling.id },
    });
    if (!block) {
      block = this.blockRepo.create({
        afdelingId: afdeling.id,
        blockCode: 'B012',
        plantingYear: 2017,
        palmVariety: 'DxP Marihat',
        totalPalms: 2860,
        areaHectares: 20.45,
        boundary: () =>
          `ST_GeomFromGeoJSON('${JSON.stringify({
            type: 'Polygon',
            coordinates: [
              [
                [101.445012, 0.53781],
                [101.44985, 0.53781],
                [101.44985, 0.5342],
                [101.445012, 0.5342],
                [101.445012, 0.53781],
              ],
            ],
          })}')`,
      });
      block = await this.blockRepo.save(block);
      this.logger.log('Seeded Block: B012 (Polygon PostGIS)');
    }

    // 4. Seed TPH-01 & TPH-02 (Point PostGIS)
    const tphsData = [
      {
        tphNumber: 'TPH-01',
        lat: 0.53775,
        lng: 101.4452,
        qr: 'QR-CWE-EST01-B012-TPH01',
      },
      {
        tphNumber: 'TPH-02',
        lat: 0.5369,
        lng: 101.4461,
        qr: 'QR-CWE-EST01-B012-TPH02',
      },
    ];

    for (const t of tphsData) {
      const existingTPH = await this.tphRepo.findOne({
        where: { qrCodeIdentifier: t.qr },
      });
      if (!existingTPH) {
        const tph = this.tphRepo.create({
          blockId: block.id,
          tphNumber: t.tphNumber,
          latitude: t.lat,
          longitude: t.lng,
          qrCodeIdentifier: t.qr,
          location: () => `ST_SetSRID(ST_MakePoint(${t.lng}, ${t.lat}), 4326)`,
        });
        await this.tphRepo.save(tph);
        this.logger.log(`Seeded TPH: ${t.tphNumber} (${t.qr})`);
      }
    }

    // 5. Seed Users (5 Jenjang Peran)
    const passwordHash = await bcrypt.hash('RahasiaKebun2026!', 10);
    const usersData = [
      {
        nip: 'MGR-001',
        name: 'Felich Pehagasa Ginting',
        email: 'felich@sawitgo.cwe.ac.id',
        roleId: 1, // MANAGER (W5)
      },
      {
        nip: 'ASK-005',
        name: 'Rifki Hakim Pradana',
        email: 'askep@sawitgo.cwe.ac.id',
        roleId: 2, // ASKEP (W4)
      },
      {
        nip: 'AST-010',
        name: 'Ahmad Sukron Yusuf',
        email: 'sukron@sawitgo.cwe.ac.id',
        roleId: 3, // ASISTEN (W3)
      },
      {
        nip: 'MDR-045',
        name: 'Ahmad Zulkifli',
        email: 'zulkifli@sawitgo.cwe.ac.id',
        roleId: 4, // MANDOR (W2)
      },
      {
        nip: 'KRN-102',
        name: 'Dika Prasetyawan',
        email: 'dika@sawitgo.cwe.ac.id',
        roleId: 5, // KRANI (W1)
      },
    ];

    for (const u of usersData) {
      const existingUser = await this.userRepo.findOne({
        where: { nip: u.nip },
      });
      if (!existingUser) {
        const user = this.userRepo.create({
          nip: u.nip,
          fullName: u.name,
          email: u.email,
          passwordHash,
          roleId: u.roleId,
          assignedEstateId: estate.id,
          assignedAfdelingId: afdeling.id,
        });
        await this.userRepo.save(user);
        this.logger.log(
          `Seeded User: ${u.nip} - ${u.name} (Role ID: ${u.roleId})`,
        );
      } else {
        existingUser.fullName = u.name;
        existingUser.email = u.email;
        existingUser.roleId = u.roleId;
        await this.userRepo.save(existingUser);
        this.logger.log(
          `Updated User: ${u.nip} - ${u.name} (Role ID: ${u.roleId})`,
        );
      }
    }
  }

  /**
   * Seed ~300 harvest logs untuk 7 hari terakhir agar dashboard
   * eksekutif (trend, KPI, restan) memiliki data riil yang siap dianalisis.
   * Idempotent: dilewati bila tabel harvest_logs sudah memiliki data.
   */
  private async seedHarvestLogs() {
    const existingCount = await this.harvestRepo.count();
    if (existingCount > 0) {
      this.logger.log(
        `Seed Harvest Logs dilewati (sudah ada ${existingCount} record)`,
      );
      return;
    }

    const users = await this.userRepo.find({ relations: { role: true } });
    if (users.length === 0) {
      this.logger.warn('Seed Harvest Logs dilewati: belum ada user.');
      return;
    }

    const seedsWithWeight: SeedUserWithWeight[] = users.map((u) => ({
      id: u.id,
      roleId: u.roleId,
      roleWeight: u.role?.roleWeight ?? 1,
      fullName: u.fullName,
    }));

    const tphs = await this.tphRepo.find();
    if (tphs.length === 0) {
      this.logger.warn('Seed Harvest Logs dilewati: belum ada TPH.');
      return;
    }

    const now = Date.now();
    const logs: Partial<HarvestLog>[] = [];
    let totalInserted = 0;

    for (let dayOffset = 6; dayOffset >= 0; dayOffset--) {
      const dayStart = new Date(now - dayOffset * 24 * 60 * 60 * 1000);
      dayStart.setHours(0, 0, 0, 0);
      const dayStartMs = dayStart.getTime();

      for (const tph of tphs) {
        const entriesPerDay = 18 + Math.floor(Math.random() * 9); // 18-26 per TPH per hari
        for (let i = 0; i < entriesPerDay; i++) {
          const hourOfDay = 6 + Math.floor(Math.random() * 12); // 06:00 - 17:59
          const minutes = Math.floor(Math.random() * 60);
          const clientTimestampMs =
            dayStartMs + hourOfDay * 3600000 + minutes * 60000;
          const elapsedHours = (now - clientTimestampMs) / 3600000;

          // Status: fresh (<12h) mayoritas PENDING; 13-48h campuran; >48h SYNCED
          let status: string;
          if (elapsedHours >= 48) {
            status = 'SYNCED';
          } else if (elapsedHours >= 13 && elapsedHours <= 48) {
            status = Math.random() < 0.55 ? 'PENDING' : 'SYNCED';
          } else {
            status = Math.random() < 0.7 ? 'PENDING' : 'SYNCED';
          }

          const user =
            seedsWithWeight[Math.floor(Math.random() * seedsWithWeight.length)];
          const janjangCount = 60 + Math.floor(Math.random() * 91); // 60-150 janjang
          const brondolanWeightKg =
            Math.round((18 + Math.random() * 37) * 10) / 10; // 18-55 kg
          const estimatedWeightKg =
            Math.round((janjangCount * this.BJR_KG + brondolanWeightKg) * 100) /
            100;

          const mentahCount = Math.floor(Math.random() * 4);
          const lewatMasakCount = Math.floor(Math.random() * 5);
          const tangkaiPanjangCount = Math.floor(Math.random() * 3);
          const masakCount = Math.max(
            0,
            janjangCount - mentahCount - lewatMasakCount - tangkaiPanjangCount,
          );

          const priorityScore = (
            user.roleWeight * 1_000_000_000_000 +
            clientTimestampMs
          ).toString();

          logs.push({
            id: randomUUID(),
            tphId: tph.id,
            blockId: tph.blockId,
            userId: user.id,
            harvestDate: dayStart.toISOString().slice(0, 10),
            janjangCount,
            brondolanWeightKg,
            estimatedWeightKg,
            mentahCount,
            masakCount,
            lewatMasakCount,
            tangkaiPanjangCount,
            status,
            clientTimestampMs: clientTimestampMs.toString(),
            priorityScore,
            gpsAccuracyMeters:
              Math.round((1.5 + Math.random() * 3.3) * 10) / 10,
            idempotencyKey: `seed-${randomUUID()}`,
          });
          totalInserted++;
        }
      }
    }

    // Insert berurutan per batch agar aman & log jumlah
    for (let i = 0; i < logs.length; i += 50) {
      const batch = logs.slice(i, i + 50);
      await this.harvestRepo.save(
        batch.map((log) => this.harvestRepo.create(log)),
      );
    }
    this.logger.log(`Seeded ${totalInserted} Harvest Logs (7 hari terakhir)`);
  }

  /**
   * Seed sync_audit_trails (INSERT/UPDATE_OVERWRITE/REJECT_STALE) dari
   * harvest logs terbaru untuk activity feed & tabel monitoring konflik.
   * Idempotent: dilewati bila tabel audit sudah memiliki data.
   */
  private async seedSyncAuditTrails() {
    const existingCount = await this.auditRepo.count();
    if (existingCount > 0) {
      this.logger.log(
        `Seed Audit Trails dilewati (sudah ada ${existingCount} record)`,
      );
      return;
    }

    const harvests = await this.harvestRepo.find({
      order: { createdAt: 'DESC' },
      take: 90,
    });
    if (harvests.length === 0) {
      this.logger.warn('Seed Audit Trails dilewati: belum ada harvest logs.');
      return;
    }

    const users = await this.userRepo.find({ relations: { role: true } });
    const weightByUserId = new Map<string, number>(
      users.map((u) => [u.id, u.role?.roleWeight ?? 1]),
    );

    const trails: Partial<SyncAuditTrail>[] = [];
    let insertCount = 0;
    let overwriteCount = 0;
    let rejectCount = 0;

    for (let i = 0; i < harvests.length; i++) {
      const h = harvests[i];
      const createdAt = new Date(
        Number(h.clientTimestampMs) + Math.floor(Math.random() * 120000),
      );

      const base = {
        harvestLogId: h.id,
        userId: h.userId,
        userRoleWeight: weightByUserId.get(h.userId) ?? 1,
        clientTimestampMs: h.clientTimestampMs,
        calculatedPriorityScore: h.priorityScore,
        payloadSnapshot: {
          tphId: h.tphId,
          blockId: h.blockId,
          janjangCount: h.janjangCount,
          brondolanWeightKg: h.brondolanWeightKg,
          status: h.status,
        },
        ipAddress: '10.0.2.2',
        deviceInfo: 'SawitGO-Android-Emulator',
        createdAt,
      };

      if (i < 8) {
        // Konflik stale: data lama yang ditolak karena priority score lebih rendah
        trails.push({
          ...base,
          syncAction: 'REJECT_STALE',
          conflictReason:
            'Priority Score lebih rendah dari data server (Wr x 10^12 + Tms). Data stale ditolak.',
        });
        rejectCount++;
      } else if (i < 20) {
        trails.push({
          ...base,
          syncAction: 'UPDATE_OVERWRITE',
          conflictReason:
            'Nilai lebih tinggi diterima berdasarkan Priority Score (Wr x 10^12 + Tms).',
        });
        overwriteCount++;
      } else {
        trails.push({
          ...base,
          syncAction: 'INSERT',
          conflictReason: null,
        });
        insertCount++;
      }
    }

    for (let i = 0; i < trails.length; i += 50) {
      const batch = trails.slice(i, i + 50);
      await this.auditRepo.save(
        batch.map((trail) => this.auditRepo.create(trail)),
      );
    }
    this.logger.log(
      `Seeded Audit Trails: ${insertCount} INSERT, ${overwriteCount} UPDATE_OVERWRITE, ${rejectCount} REJECT_STALE`,
    );
  }
}
