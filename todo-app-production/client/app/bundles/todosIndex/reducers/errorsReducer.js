// @flow
import { handleActions } from 'redux-actions';
import { List as $$List } from 'immutable';

import type { errorPayload } from '../types';
import { addTodoFailure, removeTodoFailure } from '../actions/todos/actionTypes';

// types
export type State = $$List<Error>;

export const errorsInitialState = $$List();

const errors = handleActions(
  {
    [addTodoFailure]: (state: State, { payload }: errorPayload) => state.push(payload),
    [removeTodoFailure]: (state: State, { payload }: errorPayload) => state.push(payload),
  },
  errorsInitialState,
);

export default errors;
