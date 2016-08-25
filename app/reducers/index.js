import { combineReducers } from 'redux'; 
import { routerReducer as routing } from 'react-router-redux';
import user from 'reducers/users';
import stocks from 'reducers/stocks';
import chart from 'reducers/chart';

const rootReducer = combineReducers({
  user,
  stocks,
  chart,
  routing
})

export default rootReducer;