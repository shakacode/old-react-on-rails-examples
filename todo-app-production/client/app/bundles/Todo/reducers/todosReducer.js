import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';
import { MappedTodo } from '../types';
import actionTypes from '../actions/actionTypes';

// types
export type State = $$Map<MappedTodo>;

const todoReducers = handleActions({
 ADD_TODO: ($$state, { payload }) => $$state.merge(
   payload.id,
   $$Map({
     description: payload.description,
     completed: false
   }),
 REMOVE_TODO: (state, { payload }) => $$state.delete(payload),
 TOGGLE_TODO: (state, { payload }) => {
   const oldTodo = $$state.get(payload);
   const newTodo = oldTodo.set('completed', !oldTodo.get('completed'));
   return $$state.set(payload, newTodo);
 },
}, $$Map());

export default todos;
