import io from 'socket.io';
import syncEvents from './syncEvents';

export default function(server) {
  const socketServer = io(server);

  socketServer.on('connection', socket => {
    syncEvents(socket);
  });
}