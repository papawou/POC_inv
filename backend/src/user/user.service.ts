import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly db: DatabaseService) { }

    async findUserByEmail(email: string) {
        return this.db.connection.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    }

    async createUser(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.db.connection.none('INSERT INTO users (email, password) VALUES ($1, $2)', [
            email,
            hashedPassword,
        ]);
    }
}
