import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MyGateway {
  @WebSocketServer()
  server: Server;

  sendScoreListUpdate() {
    this.server.emit('scoreListUpdated');
    console.log('scoreListUpdated');
  }
}
