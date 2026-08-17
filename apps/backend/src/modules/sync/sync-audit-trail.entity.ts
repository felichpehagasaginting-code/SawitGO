import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { User } from '../users/user.entity';

@Entity('sync_audit_trails')
export class SyncAuditTrail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'harvest_log_id', type: 'uuid' })
  harvestLogId: string;

  @ManyToOne(() => HarvestLog, (harvest) => harvest.auditTrails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'harvest_log_id' })
  harvestLog: HarvestLog;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_role_weight', type: 'int' })
  userRoleWeight: number;

  @Column({ name: 'client_timestamp_ms', type: 'bigint' })
  clientTimestampMs: string;

  @Column({ name: 'calculated_priority_score', type: 'bigint' })
  calculatedPriorityScore: string;

  @Column({ name: 'sync_action', length: 50 })
  syncAction: string; // 'INSERT', 'UPDATE_OVERWRITE', 'REJECT_STALE'

  @Column({ name: 'payload_snapshot', type: 'jsonb' })
  payloadSnapshot: any;

  @Column({ name: 'conflict_reason', type: 'text', nullable: true })
  conflictReason: string | null;

  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress: string;

  @Column({ name: 'device_info', length: 255, nullable: true })
  deviceInfo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
