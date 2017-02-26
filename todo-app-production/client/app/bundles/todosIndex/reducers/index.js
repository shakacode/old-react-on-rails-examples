// @flow
import { combineReducers } from 'redux';

import todos, { todosInitialState } from './todosReducer';
import tempTodos, { tempTodosInitialState } from './tempTodosReducer';
import addTodoForm, { addTodoFormInitialState } from './addTodoFormReducer';
import errors, { errorsInitialState } from './errorsReducer';

import type { State as todosState } from './todosReducer';
import type { State as tempTodosState } from './tempTodosReducer';
import type { State as addTodoFormState } from './addTodoFormReducer';
import type { State as errorsState } from './errorsReducer';

export type State = {
  todos: todosState,
  tempTodos: tempTodosState,
  AddTodoForm: addTodoFormState,
  errors: errorsState,
};

export const rootReducerInitialState = {
  todos: todosInitialState,
  tempTodos: tempTodosInitialState,
  addTodoForm: addTodoFormInitialState,
  errors: errorsInitialState,
};

export default combineReducers({ todos, tempTodos, addTodoForm, errors });
