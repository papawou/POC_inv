import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/config.module';
import { KpiModule } from './kpi/kpi.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, AuthModule, KpiModule],
})
export class AppModule { }
