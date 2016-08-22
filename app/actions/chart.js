import * as types from 'types';

export function newStock(data) {
  return {
    type: types.NEW_STOCK_RECIEVED,
    payload: data,
    meta: {
      serverEmit: true
    }
  };
}

export function addStock(data) {
  return {
    type: types.ADD_STOCK,
    payload: data,
    meta: {
      socketName: 'main'
    }
  };
}

export default {
  newStock,
  addStock
}