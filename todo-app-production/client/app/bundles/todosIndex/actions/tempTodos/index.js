// @flow
import _ from 'lodash-uuid';
import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const addTodo = createAction(actionTypes.ADD_TODO);
export const addTempTodo = createAction(actionTypes.ADD_TEMP_TODO,
  (description: string, id: string = `TEMP_TODO_${_.uuid}`) => ({ description, id }));
export const toggleTodo = createAction(actionTypes.TOGGLE_TODO);
