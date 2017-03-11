import * as types from '../actions/types';

export default function todos(state = [], action) {
  switch (action.type) {
    case types.ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        }];
    default:
      return state;
  }
}
