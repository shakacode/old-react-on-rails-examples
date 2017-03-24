import * as types from '../actions/types';
import createReducer from '../lib/createReducer';

const todos = createReducer([], {
  [types.ADD_TODO](state, action) {
    console.log('Add todo reducer.');
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: false,
      },
    ];
  },
  [types.TOGGLE_TODO](state, action) {
    return state.map(t => {
      if (t.id === action.id) {
        return Object.assign({}, t, { completed: !t.completed });
      }
      return t;
    });
  },
});

export default todos;
