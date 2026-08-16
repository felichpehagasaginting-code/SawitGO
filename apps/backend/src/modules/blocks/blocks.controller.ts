import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlocksService } from './blocks.service';

@ApiTags('Geospatial & Blocks')
@Controller('master')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Get('blocks')
  @ApiOperation({ summary: 'Mengambil master poligon blok untuk cache offline' })
  async getBlocks() {
    return this.blocksService.getAllBlocks();
  }

  @Get('tph')
  @ApiOperation({ summary: 'Mengambil master titik koordinat TPH' })
  async getTphs() {
    return this.blocksService.getAllTph();
  }

  @Get('blocks/:id/verify-point')
  @ApiOperation({ summary: 'Validasi Spasial Point-in-Polygon EUDR (ST_Contains)' })
  async verifyPoint(
    @Param('id') blockId: string,
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    return this.blocksService.verifyPointInBlock(blockId, Number(lat), Number(lng));
  }
}
