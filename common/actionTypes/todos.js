// @flow
import { buildActionType } from '../libs/utils/redux';

export const buildTodosActionType = buildActionType('todos');

export const addTodo = buildTodosActionType('addTodo');
export const addTodoSuccess = buildTodosActionType('addTodoSuccess');
export const editTodo = buildTodosActionType('editTodo');
export const editTodoDescription = buildTodosActionType('editTodoDescription');
export const editTodoSuccess = buildTodosActionType('editTodoSuccess');
export const removeTodo = buildTodosActionType('removeTodo');
export const removeTodoSuccess = buildTodosActionType('removeTodoSuccess');
export const toggleTodo = buildTodosActionType('toggleTodo');
export const toggleTodoSuccess = buildTodosActionType('toggleTodoSuccess');
export const setVisibilityFilter = buildTodosActionType('setVisibilityFilter');
export const getTodos = buildTodosActionType('getTodos');
export const getTodosSuccess = buildTodosActionType('getTodosSuccess');
