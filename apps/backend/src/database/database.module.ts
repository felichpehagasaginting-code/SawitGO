import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Role } from '../modules/roles/role.entity';
import { User } from '../modules/users/user.entity';
import { Estate } from '../modules/estates/estate.entity';
import { Afdeling } from '../modules/estates/afdeling.entity';
import { Block } from '../modules/blocks/block.entity';
import { TPH } from '../modules/tph/tph.entity';
import { HarvestLog } from '../modules/harvest/harvest-log.entity';
import { SyncAuditTrail } from '../modules/sync/sync-audit-trail.entity';
import { RestanTracker } from '../modules/restan/restan-tracker.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USER', 'postgres'),
        password: configService.get<string>('DATABASE_PASSWORD', 'postgres'),
        database: configService.get<string>('DATABASE_NAME', 'sawitgo_db'),
        entities: [
          Role,
          User,
          Estate,
          Afdeling,
          Block,
          TPH,
          HarvestLog,
          SyncAuditTrail,
          RestanTracker,
        ],
        synchronize: configService.get<string>('DATABASE_SYNCHRONIZE', 'false') === 'true',
        logging: configService.get<string>('DATABASE_LOGGING', 'true') === 'true',
      }),
    }),
  ],
})
export class DatabaseModule {}
