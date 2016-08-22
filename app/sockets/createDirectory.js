import io from "socket.io-client";
import socketEmits from 'sockets/bindEmits';

function connectSocket(socketArr, name, conStr, sockets, io) {
  if(sockets[name]){
    sockets[name].connect();
  } else {
    sockets[name] = io(conStr);
  }
  socketArr.push(name);
};

function disconnectSocket(name, nameSpaces, sockets) {
  const i = nameSpaces.indexOf(name);

  nameSpaces.splice(i, 1);
  sockets[name].disconnect();
}

/* *
 * Creates a direcory object to hold sockets within a single object. 
 *
 *    - nameSpaces: An array of CONNECTED socket name spaces
 *    - sockets: Sockets identified by nameSpaces, with the default
 *      namespace set to 'main'. Sockets are both connected and disconnectd
 *    - config: Contains the protocol, hostname, and port of your connection
 *    - io: The instance of the socket.io-client
 *    - connect: Used to connect or reconnect to a socket by passing it a nameSpace
 *      To reconnect to a socket simply call connect again
 *    - disconnect: Used to disconnect from a single socket for a single client
 *    - disconnectAll: Used to disconnect all connected sockets for a single client
 *    - synchEmit: synchs a single socket up to all of the dispatch events 
 *      specified in the socketEmits file. Takes the stores dispatch function
 *      and the name of a socket to synch.
 * */

export default function createDirectory() {
  const directory = {
    nameSpaces: [],
    sockets : {},
    config: {
      protocol: location.protocol || 'http',
      hostname: location.hostname || 'localhost',
      port: location.port || '5000',
    },
    io: io,
    connect: function(name = '') {
      const {io, sockets, nameSpaces, config: {protocol, hostname, port}, connectDispatch } = this;

      if(typeof name !== 'string') {
        throw new TypeError('Invalid type for directory namespace', 
        'createDirectory.js', 32);
      }

      const socket = name ? name : 'main';
      const conStr = `${protocol}//${hostname}:${port}/${name}`;

      connectSocket(nameSpaces, socket, conStr, sockets, io);

    },
    disconnect: function(name) {
      const { sockets, nameSpaces } = this;
      disconnectSocket(name, nameSpaces, sockets);
    },
    disconnectAll: function() {
      const { nameSpaces, disconnect, sockets } = this

      nameSpaces.forEach((name) => {
        disconnectSocket(name, nameSpaces, sockets);
      })
    },
    syncEmit: function(dispatch, socket) {
      const { sockets } = this;
      socketEmits(sockets[socket], dispatch);
    }
  }

  return directory; 
}