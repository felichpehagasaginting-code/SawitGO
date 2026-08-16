import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { SyncModule } from './modules/sync/sync.module';
import { BlocksModule } from './modules/blocks/blocks.module';
import { RestanModule } from './modules/restan/restan.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    SyncModule,
    BlocksModule,
    RestanModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
