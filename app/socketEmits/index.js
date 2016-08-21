import { newStock } from 'actions/chart';

function stockRecieved(socket, dispatch) {
  socket.on('newStock', (data) => {
    console.log(dispatch);
    dispatch(newStock(data));
  })
};

export default function(socket, dispatch) {
  const emitters = [stockRecieved];
  emitters.forEach((emitter) => {
    emitter(socket, dispatch);
  })
};