import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestLog } from '../harvest/harvest-log.entity';
import { RestanTracker } from './restan-tracker.entity';
import { RestanService } from './restan.service';
import { RestanController } from './restan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HarvestLog, RestanTracker])],
  controllers: [RestanController],
  providers: [RestanService],
  exports: [RestanService],
})
export class RestanModule {}
