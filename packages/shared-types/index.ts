/**
 * SAWITGO SHARED CONSTANTS & TYPES
 * Single Source of Truth for Roles, Weights, and Status Enums
 */

export enum RoleEnum {
  MANAGER = 'MANAGER',
  ASKEP = 'ASKEP',
  ASISTEN = 'ASISTEN',
  MANDOR = 'MANDOR',
  KRANI = 'KRANI',
}

export const ROLE_WEIGHTS: Record<RoleEnum, number> = {
  [RoleEnum.MANAGER]: 5,
  [RoleEnum.ASKEP]: 4,
  [RoleEnum.ASISTEN]: 3,
  [RoleEnum.MANDOR]: 2,
  [RoleEnum.KRANI]: 1,
};

export enum HarvestStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  TRANSPORTED = 'TRANSPORTED',
  RESTAN = 'RESTAN',
}

export enum RestanStatus {
  NORMAL = 'NORMAL',
  WARNING_12H = 'WARNING_12H',
  CRITICAL_20H = 'CRITICAL_20H',
  RESTAN_OVERDUE = 'RESTAN_OVERDUE',
}

export enum SyncActionStatus {
  ACCEPTED_NEW = 'ACCEPTED_NEW',
  ACCEPTED_OVERWRITE = 'ACCEPTED_OVERWRITE',
  REJECTED_STALE = 'REJECTED_STALE',
  IGNORED_IDEMPOTENT = 'IGNORED_IDEMPOTENT',
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
  accuracyMeters: number;
}

export interface HarvestPayloadDto {
  id: string; // UUIDv4
  tphId: string;
  blockId: string;
  userId: string;
  userRoleWeight: number;
  harvestDate: string;
  janjangCount: number;
  brondolanWeightKg: number;
  mentahCount: number;
  masakCount: number;
  lewatMasakCount: number;
  tangkaiPanjangCount: number;
  clientTimestampMs: number | bigint;
  priorityScore: number | bigint;
  idempotencyKey: string;
  location: GeoPoint;
}
