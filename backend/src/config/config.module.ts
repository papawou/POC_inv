import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Makes ConfigService available globally
        }),
    ],
})
export class AppConfigModule { }
