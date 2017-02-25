// @flow
import { handleActions } from 'redux-actions';
import type { stringPayload } from '../types';
import * as addTodoActionTypes from '../actions/AddTodoForm/actionTypes';
import { ADD_TODO } from '../actions/todos/actionTypes';

// types
export type State = string;

// initial state
export const addTodoFormInitialState = '';

const addTodoForm = handleActions({ // eslint-disable-next-line no-unused-vars
  [addTodoActionTypes.EDIT_ADDTODOFORM]: (state: string, { payload }: stringPayload) => payload,
  [ADD_TODO]: () => '',
}, addTodoFormInitialState);

export default addTodoForm;
