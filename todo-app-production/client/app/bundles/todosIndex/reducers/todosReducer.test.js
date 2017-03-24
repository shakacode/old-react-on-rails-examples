// @flow
import { Map as $$Map } from 'immutable';

import { normalizeArrayToMap } from 'app/libs/utils/normalizr';

import * as actions from '../actions/todos';
import reducer, { todosInitialState } from './todosReducer';

test('addTodoSuccess', () => {
  const todo = normalizeArrayToMap([{ id: 0, description: 'todo description' }]);
  const payload = todo;
  const state = todosInitialState;
  const action = actions.addTodoSuccess(payload);

  const actual = reducer(state, action);
  const expected = state.merge(todo);

  expect(actual).toEqual(expected);
});

test('edits the description of selected Todo', () => {
  const todoId = 0;
  const state = todosInitialState.set(todoId, $$Map({ description: 'todo', completed: true }));
  const action = actions.editTodoDescription({ id: todoId, description: 'new description' });

  const actual = reducer(state, action);
  const expected = todosInitialState.set(todoId, $$Map({ description: 'new description', completed: true }));

  expect(actual).toEqual(expected);
});

test('removeTodoSuccess', () => {
  const todoId = 0;
  const state = todosInitialState.set(todoId, $$Map({ description: 'todo', completed: true }));
  const action = actions.removeTodoSuccess(todoId);

  const actual = reducer(state, action);
  const expected = todosInitialState;

  expect(actual).toEqual(expected);
});

describe('toggleTodo', () => {
  test('switches completed from true to false', () => {
    const todoId = 0;
    const state = todosInitialState.set(todoId, $$Map({ description: 'todo', completed: true }));
    const action = actions.toggleTodo(todoId);

    const actual = reducer(state, action);
    const expected = todosInitialState.set(todoId, $$Map({ description: 'todo', completed: false }));

    expect(actual).toEqual(expected);
  });

  test('switches completed from false to true', () => {
    const todoId = 0;
    const state = todosInitialState.set(todoId, $$Map({ description: 'todo', completed: false }));
    const action = actions.toggleTodo(todoId);

    const actual = reducer(state, action);
    const expected = todosInitialState.set(todoId, $$Map({ description: 'todo', completed: true }));

    expect(actual).toEqual(expected);
  });
});
