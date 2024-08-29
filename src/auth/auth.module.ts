import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtOptions } from 'configs/config.jwt';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register(jwtOptions),

  ],
})
export class AuthModule { }
