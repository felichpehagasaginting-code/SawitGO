export interface UserProfile {
  id: string;
  nip: string;
  fullName: string;
  email: string;
  role: string;
  roleWeight: number;
  assignedEstateId: string | null;
  assignedAfdelingId: string | null;
}

export interface LoginResponse {
  accessToken: string;
  user: UserProfile;
}

export interface VolumeTrendDay {
  date: string;
  transactions: number;
  totalJanjang: number;
  totalBrondolanKg: number;
  estimatedTonaseKg: number;
  tonaseTon: number;
  bjrAvgKg: number;
}

export interface ActivityFeedItem {
  id: string;
  createdAt: string;
  action: 'INSERT' | 'UPDATE_OVERWRITE' | 'REJECT_STALE' | string;
  roleWeight: number;
  userName: string;
  roleName: string | null;
  blockCode: string | null;
  tphNumber: string | null;
  janjangCount: number | null;
  priorityScore: string;
  conflictReason: string | null;
}

export interface TphStatusItem {
  tphId: string;
  tphNumber: string;
  blockCode: string;
  blockId: string;
  latitude: number;
  longitude: number;
  qrCode: string;
  latest: {
    harvestId: string;
    janjangCount: number;
    brondolanWeightKg: number;
    estimatedWeightKg: number;
    elapsedHours: number;
    status: string;
    stage: 'NORMAL' | 'WARNING_12H' | 'CRITICAL_20H' | 'RESTAN_OVERDUE' | string;
    ffaEstimate: number;
  } | null;
}

export interface KpiMetrics {
  totalJanjang: number;
  totalBrondolanKg: number;
  estimatedTonaseTon: number;
  avgBjrKg: number;
  slaCompliancePercent: number;
  janjangTrendPercent: number;
  averageFfaPercentage: number;
  restanOverdueCount: number;
  totalPendingCount: number;
  totalTransactions: number;
  activeP2pSyncNodes: number;
}

export interface RestanWarning {
  harvestId: string;
  tphNumber: string;
  blockCode: string;
  janjangCount: number;
  elapsedHours: number;
  stage: 'WARNING_12H' | 'CRITICAL_20H' | 'RESTAN_OVERDUE' | string;
  estimatedFfaPercentage: number;
  latitude: number | null;
  longitude: number | null;
}

export interface RestanWarningsResponse {
  totalWarnings: number;
  criticalRestanCount: number;
  warningList: RestanWarning[];
}

export interface PickupResponse {
  success: boolean;
  message: string;
}

export interface GeoJsonFeature {
  type: 'Feature';
  id?: string;
  properties: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: unknown;
  } | null;
}

export interface GeoJsonFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJsonFeature[];
}

export interface MasterBlock {
  id: string;
  afdelingId: string;
  blockCode: string;
  plantingYear: number;
  palmVariety: string;
  totalPalms: number;
  areaHectares: number;
  boundary: unknown;
  afdeling: {
    code: string;
    name: string;
    estate: {
      code: string;
      name: string;
    } | null;
  } | null;
  tphs?: MasterTph[];
}

export interface MasterTph {
  id: string;
  blockId: string;
  tphNumber: string;
  latitude: number;
  longitude: number;
  qrCodeIdentifier: string;
  isActive: boolean;
  block?: {
    blockCode: string;
  } | null;
}
