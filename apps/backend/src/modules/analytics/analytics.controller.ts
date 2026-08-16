import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics & EUDR Export')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('eudr-geojson')
  @ApiOperation({ summary: 'Export GeoJSON FeatureCollection Poligon WGS84 untuk Kepatuhan EUDR/RSPO' })
  async getEudrGeoJson() {
    return this.analyticsService.getEudrGeoJsonFeatureCollection();
  }

  @Get('kpi-metrics')
  @ApiOperation({ summary: 'Mengambil ringkasan metrik eksekutif untuk Command Center Web' })
  async getKpis() {
    return this.analyticsService.getExecutiveKpiMetrics();
  }
}
