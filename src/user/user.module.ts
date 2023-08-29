import { Module } from '@nestjs/common';
import { UserModel } from './user.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.sevice';
import { RegisteredTimeModule } from 'src/registeredTime/registeredTime.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService, RegisteredTimeModule],
  exports: [UserService],
})
export class UserModule {}
