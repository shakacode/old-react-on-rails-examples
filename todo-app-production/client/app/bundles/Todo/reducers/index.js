// @flow
import { combineReducers } from 'redux';

import todos from './todosReducer';
import addTodoForm from './addTodoFormReducer';

import type { State as todosState } from './todosReducer';
import type { State as addTodoFormState } from './addTodoFormReducer';

export type State = {
  todos: todosState,
  AddTodoForm: addTodoFormState,
};

export default combineReducers({ todos, addTodoForm });
