// @flow
import { Map as $$Map } from 'immutable';

import { normalizeObjectToMap } from 'app/libs/utils/normalizr';

import * as actions from '../actions/todos';
import reducer, { todosInitialState } from './todosReducer';

describe('addTodoSuccess', () => {
  test('adds todo to state', () => {
    const todo = normalizeObjectToMap({ id: 0, description: 'todo description' });
    const payload = todo;
    const state = todosInitialState;
    const action = actions.addTodoSuccess(payload);

    const actual = reducer(state, action);
    const expected = state.merge(todo);

    expect(actual).toEqual(expected);
  });
});

describe('editTodoDescription', () => {
  test('edits the description of selected Todo', () => {
    const todoId = 0;
    const state = todosInitialState.set(todoId, $$Map({ description: 'todo', completed: true }));
    const action = actions.editTodoDescription({ id: todoId, description: 'new description' });

    const actual = reducer(state, action);
    const expected = todosInitialState.set(todoId, $$Map({ description: 'new description', completed: true }));

    expect(actual).toEqual(expected);
  });
});

describe('editTodoSuccess', () => {
  test('merges edited todo into state', () => {
    const todo = normalizeObjectToMap({ id: 0, description: 'todo description' });
    const payload = todo;
    const state = todosInitialState;
    const action = actions.addTodoSuccess(payload);

    const actual = reducer(state, action);
    const expected = state.merge(todo);

    expect(actual).toEqual(expected);
  });
});

describe('removeTodoSuccess', () => {
  test('removes todo from state', () => {
    const todoId = 0;
    const state = todosInitialState.set(todoId, $$Map({ description: 'todo', completed: true }));
    const action = actions.removeTodoSuccess(todoId);

    const actual = reducer(state, action);
    const expected = todosInitialState;

    expect(actual).toEqual(expected);
  });
});

describe('toggleTodoSuccess', () => {
  test('merges toggled todo into state', () => {
    const todo = normalizeObjectToMap({ id: 0, description: 'todo description', completed: true });
    const payload = todo;
    const state = todosInitialState;
    const action = actions.addTodoSuccess(payload);

    const actual = reducer(state, action);
    const expected = state.merge(todo);

    expect(actual).toEqual(expected);
  });
});
