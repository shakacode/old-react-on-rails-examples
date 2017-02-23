// @flow
import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';
import type { $$Todo, stringPayload, addTodoPayload } from '../types';
import actionTypes from '../actions/todos/actionTypes';

// types
export type State = $$Map<string, $$Todo>;

export const tempTodosInitialState = new $$Map();

const tempTodos = handleActions({
  [actionTypes.ADD_TEMP_TODO]: ($$state: State, { payload }: tempTodoPayload) => $$state.mergeIn(
    payload.id,
    $$Map({
      description: payload.description,
      completed: false,
    })),
  [actionTypes.ADD_TODO]: ($$state: State,
                          { payload }: addTodoPayload) => $$state.delete(payload.tempTodo.id),
  [actionTypes.TOGGLE_TODO]: ($$state: State, { payload }: stringPayload) => {
    const $$oldTodo: $$Todo = $$state.get(payload);
    const $$newTodo: $$Todo = $$oldTodo.set('completed', !$$oldTodo.get('completed'));
    return $$state.set(payload, $$newTodo);
  },
}, tempTodosInitialState);

export default tempTodos;
