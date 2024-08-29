import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [],
  exports: [TypeOrmModule], // Exposez le UserService et TypeOrmModule si besoin

})
export class UsersModule {}
