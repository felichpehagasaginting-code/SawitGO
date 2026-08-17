import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
  Index,
} from 'typeorm';
import { Afdeling } from '../estates/afdeling.entity';
import { TPH } from '../tph/tph.entity';
import { HarvestLog } from '../harvest/harvest-log.entity';

@Entity('blocks')
@Unique('uq_afdeling_block', ['afdelingId', 'blockCode'])
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'afdeling_id', type: 'uuid' })
  afdelingId: string;

  @ManyToOne(() => Afdeling, (afdeling) => afdeling.blocks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'afdeling_id' })
  afdeling: Afdeling;

  @Column({ name: 'block_code', length: 30 })
  blockCode: string;

  @Column({ name: 'planting_year', type: 'int' })
  plantingYear: number;

  @Column({ name: 'palm_variety', length: 100, default: 'DxP Standard' })
  palmVariety: string;

  @Column({ name: 'total_palms', type: 'int', default: 0 })
  totalPalms: number;

  @Column({ name: 'area_hectares', type: 'numeric', precision: 8, scale: 2 })
  areaHectares: number;

  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
  })
  boundary: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => TPH, (tph) => tph.block)
  tphs: TPH[];

  @OneToMany(() => HarvestLog, (harvest) => harvest.block)
  harvestLogs: HarvestLog[];
}
