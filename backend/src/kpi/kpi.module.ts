import { Module } from '@nestjs/common';
import { KpiController } from './kpi.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule
    ],
    controllers: [KpiController],
})
export class KpiModule { }
