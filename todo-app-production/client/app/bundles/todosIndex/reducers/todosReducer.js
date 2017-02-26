// @flow
import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';

import { normalizeArrayToMap } from 'app/libs/utils/normalizr';

import type { $$Todo, numberPayload, addTodoSuccessPayload } from '../types';
import { addTodoSuccess, removeTodoSuccess, toggleTodo } from '../actions/todos/actionTypes';

// types
export type State = $$Map<number, $$Todo>;

export const todosInitialState = $$Map();

const todos = handleActions(
  {
    [addTodoSuccess]: (state: State, { payload }: addTodoSuccessPayload) =>
      state.merge(normalizeArrayToMap(payload.todo)),
    [removeTodoSuccess]: (state: State, { payload }: numberPayload) => state.delete(payload),
    [toggleTodo]: (state: State, { payload }: numberPayload) => {
      const oldTodo: $$Todo = state.get(payload);
      const newTodo: $$Todo = oldTodo.set('completed', !oldTodo.get('completed'));
      return state.set(payload, newTodo);
    },
  },
  todosInitialState,
);

export default todos;
