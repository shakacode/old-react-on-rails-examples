// @flow
import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';
import type { $$Todo, numberPayload } from '../types';
import * as actionTypes from '../actions/todos/actionTypes';

// types
export type State = $$Map<number, $$Todo>;

export const todosInitialState = new $$Map();

const todos = handleActions({
  [actionTypes.addTodoSuccess]: () => { throw new Error('reducer helper not implemented yet'); },
  [actionTypes.addTodoFailure]: () => { throw new Error('reducer helper not implemented yet'); },
  [actionTypes.removeTodoSuccess]: ($$state: State,
                                      { payload }: numberPayload) => $$state.delete(payload),
  [actionTypes.removeTodoFailure]: () => { throw new Error('reducer helper not implemented yet'); },
  [actionTypes.toggleTodo]: ($$state: State, { payload }: numberPayload) => {
    const $$oldTodo: $$Todo = $$state.get(payload);
    const $$newTodo: $$Todo = $$oldTodo.set('completed', !$$oldTodo.get('completed'));
    return $$state.set(payload, $$newTodo);
  },
}, todosInitialState);

export default todos;
