import { Controller, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import * as path from 'path';

@Controller('kpi')
export class KpiController {
    constructor(private readonly jwtService: JwtService) { }

    @Get('data')
    async serveKpi(@Req() req: Request, @Res() res: Response) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('JWT token is required');
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = this.jwtService.verify(token);
            const filePath = path.join(__dirname, '..', '..', 'public', 'data.json');
            res.sendFile(filePath);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired JWT token');
        }
    }
}
