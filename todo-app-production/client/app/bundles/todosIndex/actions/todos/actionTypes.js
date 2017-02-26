// @flow
import { buildActionType } from 'app/libs/utils/redux';

export const buildTodosActionType = buildActionType('todos');

export const addTodo = buildTodosActionType('addTodo');
export const addTodoSuccess = buildTodosActionType('addTodoSuccess');
export const addTodoFailure = buildTodosActionType('addTodoFailure');
export const removeTodo = buildTodosActionType('removeTodo');
export const removeTodoSuccess = buildTodosActionType('removeTodoSuccess');
export const removeTodoFailure = buildTodosActionType('removeTodoFailure');
export const toggleTodo = buildTodosActionType('toggleTodo');
