// @flow
import { combineReducers } from 'redux';

import todos, { todosInitialState } from './todosReducer';
import addTodoForm, { addTodoFormInitialState } from './addTodoFormReducer';
import errors, { errorsInitialState } from './errorsReducer';

import type { State as todosState } from './todosReducer';
import type { State as addTodoFormState } from './addTodoFormReducer';
import type { State as errorsState } from './errorsReducer';

export type State = {
  todos: todosState,
  addTodoForm: addTodoFormState,
  errors: errorsState,
};

export const rootReducerInitialState = {
  todos: todosInitialState,
  addTodoForm: addTodoFormInitialState,
  errors: errorsInitialState,
};

export default combineReducers({ todos, addTodoForm, errors });
