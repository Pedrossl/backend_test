import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { WsAdapter } from '@nestjs/platform-ws';

@Module({
  providers: [MyGateway],
  imports: [WsAdapter],
})
export class GatewayModule {}
