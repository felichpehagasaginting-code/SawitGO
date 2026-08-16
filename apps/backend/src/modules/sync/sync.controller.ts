import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SyncService } from './sync.service';
import { BatchSyncDto } from './dto/batch-sync.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Sync Engine')
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('batch')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ingestion Batch Sinkronisasi Data Panen Lapangan' })
  @ApiResponse({
    status: 200,
    description: 'Batch diproses dan evaluasi priority score resolusi konflik selesai',
  })
  async handleBatchSync(@Body() batchSyncDto: BatchSyncDto, @Request() req: any) {
    const user = req.user || null;
    return this.syncService.processBatch(batchSyncDto, user);
  }
}
