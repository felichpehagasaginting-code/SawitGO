import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from './block.entity';
import { TPH } from '../tph/tph.entity';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(Block)
    private blockRepo: Repository<Block>,
    @InjectRepository(TPH)
    private tphRepo: Repository<TPH>,
  ) {}

  async getAllBlocks() {
    return this.blockRepo.find({
      relations: { afdeling: { estate: true }, tphs: true },
    });
  }

  async getAllTph() {
    return this.tphRepo.find({
      relations: { block: true },
    });
  }

  async verifyPointInBlock(blockId: string, latitude: number, longitude: number) {
    const rawResult = await this.blockRepo.query(
      `
      SELECT 
        id,
        block_code,
        ST_Contains(boundary, ST_SetSRID(ST_Point($2, $1), 4326)) AS is_inside,
        ST_Distance(
          ST_Transform(boundary, 3857),
          ST_Transform(ST_SetSRID(ST_Point($2, $1), 4326), 3857)
        ) AS distance_meters
      FROM blocks
      WHERE id = $3
      `,
      [latitude, longitude, blockId],
    );

    if (!rawResult || rawResult.length === 0) {
      return { isInside: false, distanceMeters: 9999, message: 'Blok tidak ditemukan.' };
    }

    const row = rawResult[0];
    return {
      blockId,
      blockCode: row.block_code,
      isInside: Boolean(row.is_inside),
      distanceMeters: Number(row.distance_meters || 0),
      isEudrValid: Boolean(row.is_inside) || Number(row.distance_meters || 0) <= 15.0,
    };
  }
}
