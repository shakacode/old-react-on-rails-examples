// @flow
import { createAction } from 'redux-actions';

import * as todos from '../actionTypes/todos';

export const addTodo = createAction(todos.addTodo);
export const addTodoSuccess = createAction(todos.addTodoSuccess);
export const addTodoFailure = createAction(todos.addTodoFailure);
export const editTodo = createAction(todos.editTodo);
export const editTodoDescription = createAction(todos.editTodoDescription);
export const editTodoSuccess = createAction(todos.editTodoSuccess);
export const editTodoFailure = createAction(todos.editTodoFailure);
export const removeTodo = createAction(todos.removeTodo);
export const removeTodoSuccess = createAction(todos.removeTodoSuccess);
export const removeTodoFailure = createAction(todos.removeTodoFailure);
export const toggleTodo = createAction(todos.toggleTodo);
