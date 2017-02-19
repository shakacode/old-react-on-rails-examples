// @flow
import { handleActions } from 'redux-actions';
import type { stringPayload } from '../types';
import actionTypes from '../actions/AddTodoForm/actionTypes';

// types
export type State = string;

const addTodoForm = handleActions({ // eslint-disable-next-line no-unused-vars
  [actionTypes.EDIT_ADDTODOFORM]: (state: string, { payload }: stringPayload) => payload,
  [actionTypes.SUBMIT_ADDTODOFORM]: () => '',
}, '');

export default addTodoForm;
