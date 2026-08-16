import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../../modules/roles/role.entity';
import { User } from '../../modules/users/user.entity';
import { Estate } from '../../modules/estates/estate.entity';
import { Afdeling } from '../../modules/estates/afdeling.entity';
import { Block } from '../../modules/blocks/block.entity';
import { TPH } from '../../modules/tph/tph.entity';

@Injectable()
export class InitialSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(InitialSeedService.name);

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
  ) {}

  async onApplicationBootstrap() {
    await this.seedRoles();
    await this.seedMasterDataAndUsers();
  }

  private async seedRoles() {
    const rolesData = [
      { id: 1, roleName: 'MANAGER', roleWeight: 5, description: 'Estate Manager - Otoritas Tertinggi Kebun' },
      { id: 2, roleName: 'ASKEP', roleWeight: 4, description: 'Asisten Kepala / Kepala Rayon' },
      { id: 3, roleName: 'ASISTEN', roleWeight: 3, description: 'Asisten Afdeling Lapangan' },
      { id: 4, roleName: 'MANDOR', roleWeight: 2, description: 'Mandor Panen Lapangan' },
      { id: 5, roleName: 'KRANI', roleWeight: 1, description: 'Krani TPH / Pencatat Hasil Panen' },
    ];

    for (const r of rolesData) {
      const existing = await this.roleRepo.findOne({ where: { roleName: r.roleName } });
      if (!existing) {
        const role = this.roleRepo.create(r);
        await this.roleRepo.save(role);
        this.logger.log(`Seeded Role: ${r.roleName} (Weight: ${r.roleWeight})`);
      }
    }
  }

  private async seedMasterDataAndUsers() {
    // 1. Seed Estate CWE
    let estate = await this.estateRepo.findOne({ where: { code: 'EST-CWE-01' } });
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
    let afdeling = await this.afdelingRepo.findOne({ where: { code: 'AFD-A', estateId: estate.id } });
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
    let block = await this.blockRepo.findOne({ where: { blockCode: 'B012', afdelingId: afdeling.id } });
    if (!block) {
      block = this.blockRepo.create({
        afdelingId: afdeling.id,
        blockCode: 'B012',
        plantingYear: 2017,
        palmVariety: 'DxP Marihat',
        totalPalms: 2860,
        areaHectares: 20.45,
        boundary: () => `ST_GeomFromGeoJSON('${JSON.stringify({
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
      { tphNumber: 'TPH-01', lat: 0.53775, lng: 101.4452, qr: 'QR-CWE-EST01-B012-TPH01' },
      { tphNumber: 'TPH-02', lat: 0.5369, lng: 101.4461, qr: 'QR-CWE-EST01-B012-TPH02' },
    ];

    for (const t of tphsData) {
      const existingTPH = await this.tphRepo.findOne({ where: { qrCodeIdentifier: t.qr } });
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
      { nip: 'MGR-001', name: 'Ir. Bambang Hariyanto', email: 'manager@sawitgo.cwe.ac.id', roleId: 1 },
      { nip: 'ASK-005', name: 'Rifki Hakim Pradana', email: 'askep@sawitgo.cwe.ac.id', roleId: 2 },
      { nip: 'AST-010', name: 'Felich Pehagasa Ginting', email: 'felich@sawitgo.cwe.ac.id', roleId: 3 },
      { nip: 'MDR-045', name: 'Ahmad Zulkifli', email: 'zulkifli@sawitgo.cwe.ac.id', roleId: 4 },
      { nip: 'KRN-102', name: 'Dika Prasetyawan', email: 'dika@sawitgo.cwe.ac.id', roleId: 5 },
    ];

    for (const u of usersData) {
      const existingUser = await this.userRepo.findOne({ where: { nip: u.nip } });
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
        this.logger.log(`Seeded User: ${u.nip} - ${u.name} (Role ID: ${u.roleId})`);
      }
    }
  }
}
