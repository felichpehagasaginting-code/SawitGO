import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class GeoPointDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  accuracy: number;
}

export class HarvestPayloadItemDto {
  @IsString()
  @IsNotEmpty()
  id: string; // UUIDv4

  @IsString()
  @IsNotEmpty()
  tphId: string;

  @IsString()
  @IsNotEmpty()
  blockId: string;

  @IsDateString()
  harvestDate: string;

  @IsNumber()
  janjangCount: number;

  @IsNumber()
  @IsOptional()
  brondolanWeightKg?: number;

  @IsNumber()
  @IsOptional()
  mentahCount?: number;

  @IsNumber()
  @IsOptional()
  masakCount?: number;

  @IsNumber()
  @IsOptional()
  lewatMasakCount?: number;

  @IsNumber()
  @IsOptional()
  tangkaiPanjangCount?: number;

  @IsNumber()
  clientTimestampMs: number;

  @IsNumber()
  priorityScore: number;

  @IsString()
  @IsNotEmpty()
  idempotencyKey: string;

  @ValidateNested()
  @Type(() => GeoPointDto)
  location: GeoPointDto;
}

export class BatchSyncDto {
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @IsNumber()
  syncTimestamp: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HarvestPayloadItemDto)
  records: HarvestPayloadItemDto[];
}
