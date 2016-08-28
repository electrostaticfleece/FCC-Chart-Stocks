import { lookUpSingle, lookUpAll } from '../api';
import * as types from '../../app/types';
import {stocks as stockController} from '../db/controllers';

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

    return lookUpSingle(ticker)
    .then((res) => {
      console.log(res);
      const { data } = res;

      socket.emit(types.NEW_STOCK_RECIEVED, data);
      socket.broadcast.emit(types.NEW_STOCK_RECIEVED, data);
      stockController.add(data);
    })
    .catch((err) => {

      socket.emit(types.ADD_STOCK_FAILURE, {ticker: ticker, error: err.toString()});
    });
  };
};

//Hydrates the applications initial state of the application
//by selecting stocks from the database, getting their data values
//via API requests, and emitting the results to the user
export function hydrateStocks(socket) {
  return () => {

    stockController.getAll()
    .then(lookUpAll)
    .then((stocks) => {

      socket.emit(types.HYDRATE_STOCKS_SUCCESS, stocks);
    })
    .catch((err) => {

      console.log('Something went wrong hydrating the state');
      socket.emit(types.HYDRATE_STOCKS_FAILURE, err);
    });
  };
};


//Deletes a stock from the server and emits the results
//to all users logged on to the site.
export function deleteStock(socket) {
  return (stock) => {
    return stockController.destroy(stock)
    .then(() => {
      console.log('The stock before emit is: ', stock);
      socket.broadcast.emit(types.STOCK_DELETED, stock);
    })
    .catch((err) => {

      socket.emit(types.DELETE_STOCK_FAILURE, {stock, error: err});
    })
  }
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
    [types.DISCONNECT] : logDisconnect,
    [types.DELETE_STOCK_REQUEST]: deleteStock
  }
};