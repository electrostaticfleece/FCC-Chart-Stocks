import io from 'socket.io';

export default function(server) {
  const socketServer = io(server);
  const connections = [];

  socketServer.on('connection', socket => {
    connections.push(socket)

    socket.on('disconnect', () => {
      const index = connections.indexOf(socket);
      connections.splice(index, 1);
      console.log('We have ' + connections.length + ' browsers connected');
    });
  });


}