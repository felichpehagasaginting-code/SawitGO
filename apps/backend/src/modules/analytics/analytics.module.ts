import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from '../blocks/block.entity';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { SyncAuditTrail } from '../sync/sync-audit-trail.entity';
import { TPH } from '../tph/tph.entity';
import { RestanModule } from '../restan/restan.module';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Block, HarvestLog, SyncAuditTrail, TPH]),
    RestanModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
