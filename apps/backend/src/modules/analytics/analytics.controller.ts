import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Analytics & EUDR Export')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('volume-trend')
  @ApiOperation({
    summary:
      'Tren volume panen harian (janjang, tonase, BJR) untuk chart dashboard',
  })
  async getVolumeTrend(@Query('days') days?: string) {
    return this.analyticsService.getVolumeTrend(Number(days) || 7);
  }

  @Get('activity-feed')
  @ApiOperation({
    summary:
      'Feed aktivitas sinkronisasi & resolusi konflik (audit trail terbaru)',
  })
  async getActivityFeed(
    @Query('limit') limit?: string,
    @Query('category') category?: string,
  ) {
    return this.analyticsService.getActivityFeed(
      Number(limit) || 15,
      category === 'conflict' ? 'conflict' : 'all',
    );
  }

  @Get('tph-status')
  @ApiOperation({
    summary:
      'Status real-time tiap TPH: panen terakhir, durasi tumpuk, estimasi FFA',
  })
  async getTphStatus() {
    return this.analyticsService.getTphStatus();
  }

  @Get('eudr-geojson')
  @ApiOperation({
    summary:
      'Export GeoJSON FeatureCollection Poligon WGS84 untuk Kepatuhan EUDR/RSPO',
  })
  async getEudrGeoJson() {
    return this.analyticsService.getEudrGeoJsonFeatureCollection();
  }

  @Get('kpi-metrics')
  @ApiOperation({
    summary: 'Mengambil ringkasan metrik eksekutif untuk Command Center Web',
  })
  async getKpis() {
    return this.analyticsService.getExecutiveKpiMetrics();
  }
}
