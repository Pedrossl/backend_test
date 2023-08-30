import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisteredTimeModel } from './registeredTime.model';
import { UserModel } from 'src/user/user.model';
import { RegisteredTimeController } from './registeredTime.controller';
import { RegisteredTimeService } from './registeredTime.service';
import { GatewayModule } from 'src/gateway/gateway.module';
import { MyGateway } from 'src/gateway/gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([RegisteredTimeModel, UserModel]),
    GatewayModule,
  ],
  providers: [RegisteredTimeService, MyGateway],
  controllers: [RegisteredTimeController],
})
export class RegisteredTimeModule {}
