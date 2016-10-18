export default function wrapper(directory) {
  const socketMiddleware = store => next => action => {
    const { type, meta, payload, ...rest } = action;
    if(directory && meta && meta.socketName) {

      directory.sockets[meta.socketName].emit(type, payload);
    }

    return next(action);
  }
  return socketMiddleware;
}
