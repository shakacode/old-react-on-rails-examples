// @flow
import { handleActions } from 'redux-actions';
import { List as $$List } from 'immutable';

import type { errorPayload } from '../types';
import { addTodoFailure, editTodoFailure, removeTodoFailure } from '../actionTypes/todos';

// types
export type State = $$List<Error>;

// initial state
export const errorsInitialState = new $$List();

// helpers
const pushPayload = (state: State, { payload }: errorPayload) => state.push(payload);

// handlers
const handlers = {
  [addTodoFailure]: pushPayload,
  [editTodoFailure]: pushPayload,
  [removeTodoFailure]: pushPayload,
};

// reducer
export default handleActions(handlers, errorsInitialState);
