import { Module } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
})
export class UserModule {}
