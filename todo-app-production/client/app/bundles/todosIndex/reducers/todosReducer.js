// @flow
import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';
import type { $$Todo, numberPayload, addTodoPayload } from '../types';
import actionTypes from '../actions/todos/actionTypes';

// types
export type State = $$Map<number, $$Todo>;

export const todosInitialState = new $$Map();

const todos = handleActions({
  [actionTypes.ADD_TODO]: ($$state: State, { payload }: addTodoPayload) => $$state.mergeIn(
    // eslint-disable-next-line no-plusplus
    payload.placeholderID, // initialize database PK at around 100 or so that tempIDs and ids won't conflict?
    $$Map({
      description: payload.description,
      completed: false,
      temp: true,
    })),
  [actionTypes.ADD_TODO_SUCCESS]: () => { throw new Error('reducer helper not implemented yet'); },
  [actionTypes.ADD_TODO_FAILURE]: () => { throw new Error('reducer helper not implemented yet'); },
  [actionTypes.REMOVE_TODO_SUCCESS]: ($$state: State,
                                      { payload }: numberPayload) => $$state.delete(payload),
  [actionTypes.REMOVE_TODO_FAILURE]: () => { throw new Error('reducer helper not implemented yet'); },
  [actionTypes.TOGGLE_TODO]: ($$state: State, { payload }: numberPayload) => {
    const $$oldTodo: $$Todo = $$state.get(payload);
    const $$newTodo: $$Todo = $$oldTodo.set('completed', !$$oldTodo.get('completed'));
    return $$state.set(payload, $$newTodo);
  },
}, todosInitialState);

export default todos;
