// @flow
import { handleActions } from 'redux-actions';
import type { stringPayload } from '../types';
import { editAddTodoForm } from '../actionTypes/forms';
import { addTodo } from '../actionTypes/todos';

// types
export type State = string;

// initial state
export const addTodoFormInitialState = '';

const addTodoForm = handleActions(
  {
    // eslint-disable-next-line no-unused-vars
    [editAddTodoForm]: (state: string, { payload }: stringPayload) => payload,
    [addTodo]: () => '',
  },
  addTodoFormInitialState,
);

export default addTodoForm;
