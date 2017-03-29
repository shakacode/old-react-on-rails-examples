// @flow
import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';

import type { $$Todo, numberPayload, normalizedTodoPayload, descriptionPayload } from '../types';
import {
  addTodoSuccess,
  editTodoSuccess,
  removeTodoSuccess,
  editTodoDescription,
  toggleTodo,
} from '../actionTypes/todos';

// types
export type State = $$Map<number, $$Todo>;

// initial state
export const todosInitialState = $$Map();

// helpers
const mergeTodo = (state: State, { payload }: normalizedTodoPayload) => state.merge(payload);
const deleteTodo = (state: State, { payload }: numberPayload) => state.delete(payload);
const editDescription = (state: State, { payload }: descriptionPayload) =>
  state.setIn([payload.id, 'description'], payload.description);
const toggle = (state: State, { payload }: numberPayload) => {
  const oldTodo: $$Todo = state.get(payload);
  const newTodo: $$Todo = oldTodo.set('completed', !oldTodo.get('completed'));
  return state.set(payload, newTodo);
};

// handlers
const handlers = {
  [addTodoSuccess]: mergeTodo,
  [removeTodoSuccess]: deleteTodo,
  [editTodoSuccess]: mergeTodo,
  [editTodoDescription]: editDescription,
  [toggleTodo]: toggle,
};

export default handleActions(handlers, todosInitialState);
