//import * as types from 'types'; - Import types after actions have been created
import { combineReducers } from 'redux';

const message = (
  state = '',
  action
) => {
  switch(action.type) {
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
  id
});

export default userReducer;