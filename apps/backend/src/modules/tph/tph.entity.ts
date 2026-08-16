import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
  Index,
} from 'typeorm';
import { Block } from '../blocks/block.entity';
import { HarvestLog } from '../harvest/harvest-log.entity';

@Entity('tph')
@Unique('uq_block_tph', ['blockId', 'tphNumber'])
export class TPH {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'block_id', type: 'uuid' })
  blockId: string;

  @ManyToOne(() => Block, (block) => block.tphs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'block_id' })
  block: Block;

  @Column({ name: 'tph_number', length: 30 })
  tphNumber: string;

  @Index({ spatial: true })
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: any;

  @Column({ name: 'latitude', type: 'double precision' })
  latitude: number;

  @Column({ name: 'longitude', type: 'double precision' })
  longitude: number;

  @Column({ name: 'qr_code_identifier', length: 100, unique: true })
  qrCodeIdentifier: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => HarvestLog, (harvest) => harvest.tph)
  harvestLogs: HarvestLog[];
}
