import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Estate } from './estate.entity';
import { Block } from '../blocks/block.entity';

@Entity('afdelings')
@Unique('uq_estate_afdeling', ['estateId', 'code'])
export class Afdeling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'estate_id', type: 'uuid' })
  estateId: string;

  @ManyToOne(() => Estate, (estate) => estate.afdelings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'estate_id' })
  estate: Estate;

  @Column({ length: 30 })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Polygon',
    srid: 4326,
    nullable: true,
  })
  boundary: any;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Block, (block) => block.afdeling)
  blocks: Block[];
}
