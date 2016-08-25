import * as types from 'types';

//Add Stock Chain

export function addStock(data) {
  return {
    type: types.ADD_STOCK,
    payload: data,
    meta: {
      socketName: 'main'
    }
  };
};

export function addStockFailure(data) {
  return {
    type: types.ADD_STOCK,
    payload: data,
    meta: {
      serverEmit: true
    }
  };
};


export function newStock(data) {
  return {
    type: types.NEW_STOCK_RECIEVED,
    payload: data,
    meta: {
      serverEmit: true
    }
  };
};

//Delete Stock Chain

export function deleteStockRequest(data) {
  return {
    type: types.DELETE_STOCK_REQUEST,
    payload: data,
    meta: {
      socketName: 'main'
    }
  }
};

export function stockDeleted(data) {
  return {
    type: types.STOCK_DELETED,
    payload: data,
    meta: {
      serverEmit: true
    }
  }
};

export function deleteStockFailure(data) {
  return {
    type: types.DELETE_STOCK_FAILURE,
    payload: data,
    meta: {
      serverEmit: true
    }
  }
}

//Hydrate state chain

export function hydrateState() {
  return {
    type: types.HYDRATE_STOCKS_REQUEST,
    meta: {
      socketName: 'main'
    }
  }
};

export function hydrateStateSuccess(data) {
  return {
    type: types.HYDRATE_STOCKS_SUCCESS,
    payload: data,
    meta: {
      serverEmit: true
    }
  }
};

export function hydrateStateFailure(data) {
  return {
    type: types.HYDRATE_STOCKS_FAILURE,
    payload: data,
    meta: {
      serverEmit: true
    }
  }
};

export default {
  addStock,
  newStock,
  addStockFailure,
  deleteStockRequest,
  stockDeleted,
  deleteStockFailure,
  hydrateState,
  hydrateStateSuccess,
  hydrateStateFailure
}