// @flow
import { combineReducers } from 'redux';

import todos, { todosInitialState } from './todosReducer';
import addTodoForm, { addTodoFormInitialState } from './addTodoFormReducer';

import type { State as todosState } from './todosReducer';
import type { State as addTodoFormState } from './addTodoFormReducer';

export type State = {
  todos: todosState,
  AddTodoForm: addTodoFormState,
};

export const rootReducerInitialState = {
  todos: todosInitialState,
  addTodoForm: addTodoFormInitialState,
};

export default combineReducers({ todos, addTodoForm });
