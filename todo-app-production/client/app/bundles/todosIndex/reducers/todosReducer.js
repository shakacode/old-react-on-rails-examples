// @flow
import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';

import { normalizeArrayToMap } from 'app/libs/utils/normalizr';

import type { $$Todo, numberPayload, addTodoSuccessPayload } from '../types';
import { addTodoSuccess, removeTodoSuccess, toggleTodo } from '../actionTypes/todos';

// types
export type State = $$Map<number, $$Todo>;

// initial state
export const todosInitialState = $$Map();

// helpers
const createTodo = (state: State, { payload }: addTodoSuccessPayload) => state.merge(normalizeArrayToMap(payload.todo));
const deleteTodo = (state: State, { payload }: numberPayload) => state.delete(payload);
const toggle = (state: State, { payload }: numberPayload) => {
  const oldTodo: $$Todo = state.get(payload);
  const newTodo: $$Todo = oldTodo.set('completed', !oldTodo.get('completed'));
  return state.set(payload, newTodo);
};

// handlers
const handlers = {
  [addTodoSuccess]: createTodo,
  [removeTodoSuccess]: deleteTodo,
  [toggleTodo]: toggle,
};

export default handleActions(handlers, todosInitialState);
