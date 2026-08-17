import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncAuditTrail } from './sync-audit-trail.entity';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { TPH } from '../tph/tph.entity';
import { Block } from '../blocks/block.entity';
import { User } from '../users/user.entity';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SyncAuditTrail, HarvestLog, TPH, Block, User]),
  ],
  controllers: [SyncController],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}
