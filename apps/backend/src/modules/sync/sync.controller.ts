import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SyncService } from './sync.service';
import { BatchSyncDto } from './dto/batch-sync.dto';

@ApiTags('Sync Engine')
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('batch')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ingestion Batch Sinkronisasi Data Panen Lapangan' })
  @ApiResponse({ status: 200, description: 'Batch diproses dan evaluasi priority score selesai' })
  async handleBatchSync(@Body() batchSyncDto: BatchSyncDto) {
    return this.syncService.processBatch(batchSyncDto);
  }
}
