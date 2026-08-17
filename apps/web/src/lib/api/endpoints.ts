import { apiClient } from './client';
import type {
  ActivityFeedItem,
  GeoJsonFeatureCollection,
  KpiMetrics,
  LoginResponse,
  MasterBlock,
  MasterTph,
  PickupResponse,
  RestanWarningsResponse,
  TphStatusItem,
  UserProfile,
  VolumeTrendDay,
} from './types';

export const apiEndpoints = {
  login(nip: string, password: string): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', { nip, password });
  },
  getProfile(): Promise<UserProfile> {
    return apiClient.get<UserProfile>('/auth/profile');
  },
  getKpiMetrics(): Promise<KpiMetrics> {
    return apiClient.get<KpiMetrics>('/analytics/kpi-metrics');
  },
  getVolumeTrend(days = 7): Promise<VolumeTrendDay[]> {
    return apiClient.get<VolumeTrendDay[]>(`/analytics/volume-trend?days=${days}`);
  },
  getActivityFeed(limit = 15, category: 'all' | 'conflict' = 'all'): Promise<ActivityFeedItem[]> {
    return apiClient.get<ActivityFeedItem[]>(
      `/analytics/activity-feed?limit=${limit}&category=${category}`,
    );
  },
  getTphStatus(): Promise<TphStatusItem[]> {
    return apiClient.get<TphStatusItem[]>('/analytics/tph-status');
  },
  getEudrGeoJson(): Promise<GeoJsonFeatureCollection> {
    return apiClient.get<GeoJsonFeatureCollection>('/analytics/eudr-geojson');
  },
  getRestanWarnings(): Promise<RestanWarningsResponse> {
    return apiClient.get<RestanWarningsResponse>('/restan/warnings');
  },
  confirmPickup(harvestId: string): Promise<PickupResponse> {
    return apiClient.post<PickupResponse>(`/restan/${harvestId}/pickup`);
  },
  getBlocks(): Promise<MasterBlock[]> {
    return apiClient.get<MasterBlock[]>('/master/blocks');
  },
  getTphs(): Promise<MasterTph[]> {
    return apiClient.get<MasterTph[]>('/master/tph');
  },
};
