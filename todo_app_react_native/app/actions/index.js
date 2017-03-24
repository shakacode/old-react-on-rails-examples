// @flow

import * as types from './types';

let nextTodoId = 0;

export function addTodo(text: string) {
  nextTodoId += 1;
  console.log('ADD_TODO triggered.');
  return {
    type: types.ADD_TODO,
    id: nextTodoId,
    text,
  };
}

export function setVisbilityFilter(filter: string) {
  return {
    type: types.SET_VISIBILITY_FILTER,
    filter,
  };
}

export function toggleTodo(id: number) {
  return {
    type: types.TOGGLE_TODO,
    id,
  };
}
