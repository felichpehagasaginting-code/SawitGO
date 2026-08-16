import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { TPH } from '../tph/tph.entity';
import { Block } from '../blocks/block.entity';
import { User } from '../users/user.entity';
import { SyncAuditTrail } from '../sync/sync-audit-trail.entity';
import { RestanTracker } from '../restan/restan-tracker.entity';

@Entity('harvest_logs')
export class HarvestLog {
  @PrimaryColumn('uuid')
  id: string; // Generated Client-Side (UUIDv4)

  @Column({ name: 'tph_id', type: 'uuid' })
  tphId: string;

  @ManyToOne(() => TPH, (tph) => tph.harvestLogs)
  @JoinColumn({ name: 'tph_id' })
  tph: TPH;

  @Column({ name: 'block_id', type: 'uuid' })
  blockId: string;

  @ManyToOne(() => Block, (block) => block.harvestLogs)
  @JoinColumn({ name: 'block_id' })
  block: Block;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.harvestLogs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'verified_by_user_id', type: 'uuid', nullable: true })
  verifiedByUserId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'verified_by_user_id' })
  verifiedByUser: User;

  @Column({ name: 'harvest_date', type: 'date' })
  harvestDate: string;

  @Column({ name: 'janjang_count', type: 'int' })
  janjangCount: number;

  @Column({ name: 'brondolan_weight_kg', type: 'numeric', precision: 8, scale: 2, default: 0.0 })
  brondolanWeightKg: number;

  @Column({ name: 'estimated_weight_kg', type: 'numeric', precision: 10, scale: 2, default: 0.0 })
  estimatedWeightKg: number;

  @Column({ name: 'mentah_count', type: 'int', default: 0 })
  mentahCount: number;

  @Column({ name: 'masak_count', type: 'int', default: 0 })
  masakCount: number;

  @Column({ name: 'lewat_masak_count', type: 'int', default: 0 })
  lewatMasakCount: number;

  @Column({ name: 'tangkai_panjang_count', type: 'int', default: 0 })
  tangkaiPanjangCount: number;

  @Index()
  @Column({ length: 30, default: 'PENDING' })
  status: string; // PENDING, VERIFIED, TRANSPORTED, RESTAN

  @Column({ name: 'client_timestamp_ms', type: 'bigint' })
  clientTimestampMs: string;

  @Index()
  @Column({ name: 'priority_score', type: 'bigint' })
  priorityScore: string;

  @Column({
    name: 'gps_coordinate_recorded',
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  gpsCoordinateRecorded: any;

  @Column({ name: 'gps_accuracy_meters', type: 'numeric', precision: 5, scale: 2, nullable: true })
  gpsAccuracyMeters: number;

  @Column({ name: 'idempotency_key', length: 128, unique: true })
  idempotencyKey: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => SyncAuditTrail, (audit) => audit.harvestLog)
  auditTrails: SyncAuditTrail[];

  @OneToMany(() => RestanTracker, (restan) => restan.harvestLog)
  restanTrackers: RestanTracker[];
}
