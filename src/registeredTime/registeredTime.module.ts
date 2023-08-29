import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisteredTimeModel } from './registeredTime.model';
import { UserModel } from 'src/user/user.model';
import { RegisteredTimeController } from './registeredTime.controller';
import { RegisteredTimeService } from './registeredTime.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegisteredTimeModel, UserModel])],
  providers: [RegisteredTimeService],
  controllers: [RegisteredTimeController],
})
export class RegisteredTimeModule {}
