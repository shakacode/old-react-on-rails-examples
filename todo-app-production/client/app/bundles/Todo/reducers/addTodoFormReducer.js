import { handleActions } from 'redux-actions';
import { Map as $$Map } from 'immutable';
import { MappedTodo } from '../types';
import actionTypes from '../actions/AddTodoForm/actionTypes';

// types
export type State = string;

const addTodoForm = handleActions({
  HANDLE_CHANGE: (state, { payload }) => payload,
  HANDLE_SUBMIT: (state) => "",
}, "");

export default addTodoForm;
