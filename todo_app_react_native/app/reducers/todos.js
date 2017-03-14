import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

export const todos = createReducer([], {
  [types.ADD_TODO](state, action) {
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: false,
      },
    ];
  },
});
