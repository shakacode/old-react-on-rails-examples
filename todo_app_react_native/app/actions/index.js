import * as types from './types';

let nextTodoId = 0;

export function addTodo(text) {
  nextTodoId += 1;
  return {
    type: types.ADD_TODO,
    id: nextTodoId,
    text,
  };
}

export function setVisbilityFilter(filter) {
  return {
    type: types.SET_VISIBILITY_FILTER,
    filter,
  };
}

export function toggleTodo(id) {
  return {
    type: types.TOGGLE_TODO,
    id,
  };
}
