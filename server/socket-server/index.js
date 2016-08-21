import io from 'socket.io';

export default function(server) {
  const socketServer = io(server);
  const connections = [];

  socketServer.on('connection', socket => {
    connections.push(socket)
    console.log('We have ' + connections.length + ' browsers connected');

    socket.on('ADD_STOCK', (data) => {
      
    })
  
    socket.on('disconnect', () => {
      const index = connections.indexOf(socket);
      connections.splice(index, 1);
      console.log('We have ' + connections.length + ' browsers connected');
    });
  });


http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22FB%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D

}