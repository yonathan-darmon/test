import * as dotenv from 'dotenv';
import { JwtModuleOptions } from '@nestjs/jwt';

dotenv.config();

export const jwtOptions: JwtModuleOptions = {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
}