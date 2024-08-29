import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from 'configs/config.bdd';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/user.module';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot(typeOrmConfig)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
