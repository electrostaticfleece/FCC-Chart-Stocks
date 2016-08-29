import * as types from 'types'

export function updateWidth(data) {
  return {
    type: types.UPDATE_CHART_WIDTH,
    payload: data
  }
}

export function updateDimensions(data) {
  if(data.height && data.margin && data.margin.top && data.margin.bottom) {
    data.adjHeight = data.height - data.margin.top - data.margin.bottom;
  }

  if(data.width && data.margin && data.margin.left && data.margin.right) {
    data.adjWidth = data.width - data.margin.left - data.margin.right;
  }
  
  return {
    type: types.UPDATE_CHART_DIMENSIONS,
    payload: data
  }
}

export function updateHeight(data) {
  return {
    type: types.UPDATE_CHART_HEIGHT,
    payload: data
  }
}

export function changeType(data) {
  return {
    type: types.CHANGE_CHART_TYPE,
    payload: data
  }
}

export function changeView(data) {
  return {
    type: types.CHANGE_CHART_VIEW,
    payload: data
  }
}

export function selectDate(data) {
  return {
    type: types.SELECT_DATE,
    payload: data
  }
}