import { getStock, getAllStocks } from '../API';
import * as types from '../../app/types';

const connections = [];

//Logs when a user has connected to the page
export function logConnection(socket) {
  connections.push(socket);
  console.log('We have ' + connections.length + ' browsers connected');
};

//Returns a function that will emit a new stock to all
//users currently visting the application when called.
export function getSingleStock(socket){
  return (ticker) => {

    return getStock(ticker)
    .then((res) => {
      const { data } = res;
      socket.emit(types.NEW_STOCK_RECIEVED, {[data.ticker]: data});
      socket.broadcast(types.NEW_STOCK_RECIEVED, {[data.ticker]: data});

      return data
    }).then((data) => {
      
    }).catch((err) => {
      socket.emit(types.ADD_STOCK_FAILURE, err);
    });
  };
};

//Hydrates the applications initial state of the application
//and returns a promise that may be used to update the database
export function hydrateStocks(socket) {
  return (stocks) => {

    return getAllStocks(stocks)
    .then((stocks) => {
      socket.emit(types.HYDRATE_STOCKS_SUCCESS, stocks);
    })
    .catch((err) => {
      console.log('Something went wrong...');
      socket.emit(types.HYDRATE_STOCKS_FAILURE, err);
    });
  };
};

//Logs when a user has disconnected from a page
export function logDisconnect(socket){
  return () => {
    const index = connections.indexOf(socket);

    connections.splice(index, 1);
    console.log('We have ' + connections.length + ' browsers connected');
  };
};

export default {
  onConnection: {
    logConnection
  },
  postConnection: {
    [types.ADD_STOCK]: getSingleStock,
    [types.HYDRATE_STOCKS_REQUEST]: hydrateStocks,
    [types.DISCONNECT] : logDisconnect
  }
};