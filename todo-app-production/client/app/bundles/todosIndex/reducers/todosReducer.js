// @flow
import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';

import type { $$Todo, numberPayload, normalizedTodoPayload, descriptionPayload } from '../types';
import {
  addTodoSuccess,
  editTodoSuccess,
  removeTodoSuccess,
  editTodoDescription,
  toggleTodoSuccess,
} from '../actionTypes/todos';

// types
export type State = $$Map<number, $$Todo>;

// initial state
export const todosInitialState = $$Map();

// helpers
const mergeTodo = (state: State, { payload }: normalizedTodoPayload) =>
  console.log(`payload: ${payload}`) || state.merge(payload);
const deleteTodo = (state: State, { payload }: numberPayload) => state.delete(payload);
const editDescription = (state: State, { payload }: descriptionPayload) =>
  state.setIn([payload.id, 'description'], payload.description);

// handlers
const handlers = {
  [addTodoSuccess]: mergeTodo,
  [editTodoSuccess]: mergeTodo,
  [editTodoDescription]: editDescription,
  [removeTodoSuccess]: deleteTodo,
  [toggleTodoSuccess]: mergeTodo,
};

export default handleActions(handlers, todosInitialState);
