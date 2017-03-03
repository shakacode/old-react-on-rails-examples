// @flow
import _ from 'lodash/fp';
import { createAction } from 'redux-actions';

import * as todos from '../actionTypes/todos';

export const addTodo = createAction(todos.addTodo, (description: string, id: string = _.uniqueId('TEMP_TODO_')) => ({
  description,
  id,
}));
export const addTodoSuccess = createAction(todos.addTodoSuccess);
export const addTodoFailure = createAction(todos.addTodoFailure);
export const removeTodo = createAction(todos.removeTodo);
export const removeTodoSuccess = createAction(todos.removeTodoSuccess);
export const removeTodoFailure = createAction(todos.removeTodoFailure);
export const toggleTodo = createAction(todos.toggleTodo);
