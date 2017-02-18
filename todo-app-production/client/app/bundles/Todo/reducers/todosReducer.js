import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';
import { MappedTodo } from '../types';
import actionTypes from '../actions/TodoList/actionTypes';

// types
export type State = $$Map<MappedTodo>;

let tempID = 0;

const todos = handleActions({
  ADD_TODO: ($$state, { payload }) => $$state.merge(
    tempID++,
    $$Map({
      description: payload.description,
      completed: false,
      temp: true,
    }),
  ADD_TODO_SUCCESS: () => throw error('reducer helper not implemented yet'), // replace tempID, add created_at & updated_at keys
  ADD_TODO_FAILURE: () => throw error('reducer helper not implemented yet'), // flash alert
  REMOVE_TODO_SUCCESS: ($$state, { payload }) => $$state.delete(payload),
  REMOVE_TODO_FAILURE: () => throw error('reducer helper not implemented yet'), // flash alert
  TOGGLE_TODO: ($$state, { payload }) => {
    const oldTodo = $$state.get(payload);
    const newTodo = oldTodo.set('completed', !oldTodo.get('completed'));
    return $$state.set(payload, newTodo);
  },
}, $$Map());

export default todos;
