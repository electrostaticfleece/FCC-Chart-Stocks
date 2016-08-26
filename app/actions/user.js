import * as types from 'types';

export function typing(data) {
  return {
    type: types.TYPING,
    payload: data
  }
};

