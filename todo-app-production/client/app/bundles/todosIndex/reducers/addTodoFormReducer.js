// @flow
import { handleActions } from 'redux-actions';
import type { stringPayload } from '../types';
import { editAddTodoForm } from '../actionTypes/forms';
import { addTodo } from '../actionTypes/todos';

// types
export type State = string;

// initial state
export const addTodoFormInitialState = '';

// helpers
// eslint-disable-next-line no-unused-vars
const stateToPayload = (state: string, { payload }: stringPayload) => payload;
const stateToEmptyString = () => '';

// handlers
const handlers = {
  [editAddTodoForm]: stateToPayload,
  [addTodo]: stateToEmptyString,
};

export default handleActions(handlers, addTodoFormInitialState);
