import * as types from 'types';
import { combineReducers } from 'redux';

const loaded = (
  state = false,
  action
) => {
  switch(action.type) {
    case types.HYDRATE_STOCKS_SUCCESS:
      return true;
    default: 
      return state;
  }
}

const type = (
  state = 'Close',
  action
) => {
  switch(action.type) {
    case types.CHANGE_CHART_TYPE:
      return action.payload.name;
    default:
      return state;
  }
};

const selected = (
  state = false,
  action
  ) => {
  switch(action.type) {
    case types.SELECT_DATE:
      return action.payload;
    default:
      return state;
  }
};

const view = (
  state = 'year',
  action
) => {
  switch(action.type) {
    case types.CHANGE_CHART_VIEW:
      return action.payload;
    default:
      return state;
  }
}

const graphNum = (
  state = 4,
  action
) => {
  switch(action.type) {
    case types.CHANGE_CHART_TYPE:
      return action.payload.number
    default: 
      return state;
  }
}

const height = (
  state = 500,
  action
) => {
  switch(action.type) {
    case types.UPDATE_CHART_HEIGHT:
      return action.payload
    case types.UPDATE_CHART_DIMENSIONS:
      return action.payload.height || state;
    default: 
      return state;
  }
};

const width = (
  state = 1000,
  action
) => {
  switch(action.type) {
    case types.UPDATE_CHART_WIDTH:
      return action.payload
    case types.UPDATE_CHART_DIMENSIONS:
      return action.payload.width || state;
    default: 
      return state;
  }
};

const adjWidth = (
  state = 870,
  action 
) => {
  switch(action.type) {
    case types.UPDATE_CHART_DIMENSIONS:
      return action.payload.adjWidth || state;
    default:
      return state;
  }
};

const adjHeight = (
  state = 390,
  action
) => {
  switch(action.type) {
    case types.UPDATE_CHART_DIMENSIONS:
      return action.payload.adjHeight || state;
    default:
      return state;
  }
}

const margin = (
  state = {
    top: 20, 
    right: 10, 
    bottom: 90, 
    left: 80
  },
  action
) => {
  switch(action.type) {
    default: 
      return state;
  }
};

const chartReducer = combineReducers({
  type,
  graphNum,
  view,
  height,
  adjHeight,
  adjWidth,
  loaded,
  width,
  selected,
  margin
});

export default chartReducer;