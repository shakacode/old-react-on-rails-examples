// @flow
import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';

import type { $$Todo, stringPayload, tempTodoPayload, addTodoSuccessPayload } from '../types';
import * as actionTypes from '../actions/todos/actionTypes';

// types
export type State = $$Map<string, $$Todo>;

export const tempTodosInitialState = new $$Map();

const tempTodos = handleActions(
  {
    [actionTypes.addTodo]: ($$state: State, { payload }: tempTodoPayload) => $$state.set(
      payload.id,
      $$Map({
        description: payload.description,
        completed: false,
      }),
    ),
    [actionTypes.addTodoSuccess]: ($$state: State, { payload }: addTodoSuccessPayload) =>
      $$state.delete(payload.tempTodo.id),
    [actionTypes.toggleTodo]: ($$state: State, { payload }: stringPayload) => {
      const $$oldTodo: $$Todo = $$state.get(payload);
      const $$newTodo: $$Todo = $$oldTodo.set('completed', !$$oldTodo.get('completed'));
      return $$state.set(payload, $$newTodo);
    },
  },
  tempTodosInitialState,
);

export default tempTodos;
