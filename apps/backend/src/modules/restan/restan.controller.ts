import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RestanService } from './restan.service';

@ApiTags('Restan & FFA Tracker')
@Controller('restan')
export class RestanController {
  constructor(private readonly restanService: RestanService) {}

  @Get('warnings')
  @ApiOperation({ summary: 'Deteksi real-time potensi restan dan degradasi asam lemak bebas (FFA)' })
  async getWarnings() {
    return this.restanService.calculateRestanWarnings();
  }

  @Post(':id/pickup')
  @ApiOperation({ summary: 'Konfirmasi pengangkutan TBS oleh truk ke pabrik (PKS)' })
  async confirmPickup(@Param('id') id: string) {
    return this.restanService.markAsPickedUp(id);
  }
}
