// @flow
import { buildActionType } from '../libs/utils/redux';

export const buildTodosActionType = buildActionType('todos');

export const addTodo = buildTodosActionType('addTodo');
export const addTodoSuccess = buildTodosActionType('addTodoSuccess');
export const addTodoError = buildTodosActionType('addTodoError');
export const editTodo = buildTodosActionType('editTodo');
export const editTodoDescription = buildTodosActionType('editTodoDescription');
export const editTodoSuccess = buildTodosActionType('editTodoSuccess');
export const editTodoError = buildActionType('editTodoError');
export const removeTodo = buildTodosActionType('removeTodo');
export const removeTodoSuccess = buildTodosActionType('removeTodoSuccess');
export const removeTodoError = buildTodosActionType('removeTodoError');
export const toggleTodo = buildTodosActionType('toggleTodo');
export const toggleTodoSuccess = buildTodosActionType('toggleTodoSuccess');
export const toggleTodoError = buildActionType('toggleTodoError');
export const setVisibilityFilter = buildTodosActionType('setVisibilityFilter');
export const getTodos = buildTodosActionType('getTodos');
export const getTodosSuccess = buildTodosActionType('getTodosSuccess');
export const getTodosError = buildTodosActionType('getTodosError');
export const timeoutTodo = buildTodosActionType('timeoutTodo');
