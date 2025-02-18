import * as pgPromise from 'pg-promise';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private db: pgPromise.IDatabase<any>;
    private pgp: pgPromise.IMain;

    constructor(private configService: ConfigService) {
        this.pgp = pgPromise();
        this.db = this.pgp({
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            database: this.configService.get<string>('DB_NAME'),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
        });
    }

    get connection() {
        return this.db;
    }

    async onModuleInit() {
        console.log('Database connection established');
    }

    async onModuleDestroy() {
        await this.pgp.end();
        console.log('Database connection closed');
    }
}
