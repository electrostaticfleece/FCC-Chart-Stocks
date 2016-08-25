import * as types from 'types';
import { combineReducers } from 'redux';
import { removeByKey } from 'utilityFunctions';

const stockIndex = (
  state = [],
  action
) => {
  switch(action.type){
    case types.NEW_STOCK_RECIEVED:
    case types.DELETE_STOCK_FAILURE:
      let data = action.payload.stock || action.payload;
      return [...state, data.ticker];
    case types.STOCK_DELETED:
    case types.DELETE_STOCK_REQUEST:
      let i = state.indexOf(action.payload.ticker);
      return [...state.splice(i, 1), ...state.splice(i + 1)];
    case types.HYDRATE_STOCKS_SUCCESS:
      return action.payload.stockIndex;
    default:
      return state;
  }
};

const stocks = (
  state = {},
  action
) => {
  switch(action.type){
    case types.NEW_STOCK_RECIEVED:
    case types.DELETE_STOCK_FAILURE:
      let data = action.payload.stock || action.payload;
      return {...state, [data.ticker] : data};
    case types.STOCK_DELETED:
    case types.DELETE_STOCK_REQUEST:
      return removeByKey(state, action.payload.ticker);
    case types.HYDRATE_STOCKS_SUCCESS:
      return action.payload.stocks;
    default:
      return state;
  }
};

const stockReducer = combineReducers({
  stockIndex,
  stocks
});

export default stockReducer;