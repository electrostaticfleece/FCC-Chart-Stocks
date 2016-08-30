import * as types from 'types';
import { combineReducers } from 'redux';

const message = (
  state = '',
  action
) => {
  switch(action.type) {
    case types.DELETE_STOCK_FAILURE:
      return 'We were unable to delete your stock';
    case types.HYDRATE_STOCKS_FAILURE:
      return 'We could not retrieve stocks. Please try reloading the page at a later time.';
    case types.ADD_STOCK_FAILURE: 
      return 'Your stock could not be added or found. Make sure your ticker symbol is correct.';
    default: 
      return '';
  }
}

const input = (
  state = '',
  action
) => {
  switch(action.type) {
    case types.TYPING: 
      return action.payload
    default:
      return state;
  }
}

const id = (
  state = null,
  action
) => {
  switch(action.type) {
    default:
      return state;
  }
}

const userReducer = combineReducers({
  message,
  input,
  id
});

export default userReducer;