// @flow
import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';

import type { $$Todo, stringPayload, tempTodoPayload, addTodoSuccessPayload } from '../types';
import { addTodo, addTodoSuccess, toggleTodo } from '../actionTypes/todos';

// types
export type State = $$Map<string, $$Todo>;

// initial state
export const tempTodosInitialState = new $$Map();

// helpers
const createTempTodo = (state: State, { payload }: tempTodoPayload) => state.set(
  payload.id,
  $$Map({
    description: payload.description,
    completed: false,
  }),
);
const deleteTempTodo = (state: State, { payload }: addTodoSuccessPayload) => state.delete(payload.tempTodo.id);
const toggleTempTodo = (state: State, { payload }: stringPayload) => {
  const oldTodo: $$Todo = state.get(payload);
  const newTodo: $$Todo = oldTodo.set('completed', !oldTodo.get('completed'));
  return state.set(payload, newTodo);
};

// handlers
const handlers = {
  [addTodo]: createTempTodo,
  [addTodoSuccess]: deleteTempTodo,
  [toggleTodo]: toggleTempTodo,
};

export default handleActions(handlers, tempTodosInitialState);
