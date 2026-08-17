import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { HarvestLog } from '../harvest/harvest-log.entity';

@Entity('restan_trackers')
@Unique(['harvestLogId'])
export class RestanTracker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'harvest_log_id', type: 'uuid' })
  harvestLogId: string;

  @ManyToOne(() => HarvestLog, (harvest) => harvest.restanTrackers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'harvest_log_id' })
  harvestLog: HarvestLog;

  @Column({ name: 'harvest_time', type: 'timestamptz' })
  harvestTime: Date;

  @Column({ name: 'pickup_time', type: 'timestamptz', nullable: true })
  pickupTime: Date;

  @Column({ name: 'duration_hours', type: 'int', default: 0 })
  durationHours: number;

  @Column({ name: 'is_restan', default: false })
  isRestan: boolean;

  @Column({
    name: 'estimated_ffa_percentage',
    type: 'numeric',
    precision: 5,
    scale: 2,
    default: 1.5,
  })
  estimatedFfaPercentage: number;

  @Column({ length: 30, default: 'NORMAL' })
  status: string; // 'NORMAL', 'WARNING_12H', 'CRITICAL_20H', 'RESTAN_OVERDUE'

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
