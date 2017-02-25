// @flow
import _ from 'lodash/fp';
import { createAction } from 'redux-actions';

import * as actionTypes from './actionTypes';

export const addTodo = createAction(actionTypes.ADD_TODO,
  (description: string, id: string = _.uniqueId('TEMP_TODO_')) => ({ description, id }));
export const addTodoSuccess = createAction(actionTypes.ADD_TODO_SUCCESS);
export const addTodoFailure = createAction(actionTypes.ADD_TODO_FAILURE);
export const removeTodo = createAction(actionTypes.REMOVE_TODO);
export const removeTodoSuccess = createAction(actionTypes.REMOVE_TODO_SUCCESS);
export const removeTodoFailure = createAction(actionTypes.REMOVE_TODO_FAILURE);
export const toggleTodo = createAction(actionTypes.TOGGLE_TODO);
