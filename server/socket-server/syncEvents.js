import * as types from '../../app/types';
import events from './socketEvents';

function bindSocket(socket, event, fn) {
  socket.on(event, fn(socket));
};

//Syncs all sockets to their events. Connection events
//are fired immediately. PostConnection events bind
//a socket to the event and are fired when the event occurs
export default function syncEvents(socket) {
  const {onConnection, postConnection} = events;
  const postConnectionKeys = Object.keys(postConnection);
  const connectionKeys = Object.keys(onConnection);

  connectionKeys.forEach((key) => {
    onConnection[key](socket);
  });

  postConnectionKeys.forEach((key) => {
    bindSocket(socket, key, postConnection[key]);
  });
};