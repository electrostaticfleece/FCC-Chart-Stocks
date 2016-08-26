import * as types from 'types';
import { combineReducers } from 'redux';

const message = (
  state = '',
  action
) => {
  switch(action.type) {
    case types.NEW_STOCK_RECIEVED:
      return 'New Stock for you';
    default: 
      return state;
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