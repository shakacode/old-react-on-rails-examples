// @flow
import _ from 'lodash/fp';
import { createAction } from 'redux-actions';

import * as actionTypes from './actionTypes';

export const addTodo = createAction(actionTypes.addTodo, (
  description: string,
  id: string = _.uniqueId('TEMP_TODO_'),
) => ({ description, id }));
export const addTodoSuccess = createAction(actionTypes.addTodoSuccess);
export const addTodoFailure = createAction(actionTypes.addTodoFailure);
export const removeTodo = createAction(actionTypes.removeTodo);
export const removeTodoSuccess = createAction(actionTypes.removeTodoSuccess);
export const removeTodoFailure = createAction(actionTypes.removeTodoFailure);
export const toggleTodo = createAction(actionTypes.toggleTodo);
