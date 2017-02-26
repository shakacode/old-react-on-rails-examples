import { Map as $$Map, fromJS } from 'immutable';

import * as actions from '../actions/todos';
import reducer, { tempTodosInitialState } from './tempTodosReducer';

test('addTodo', () => {
  const todoId = 'todoId';
  const state = fromJS({});
  const action = actions.addTodo('todo', todoId);
  const actual = reducer(state, action);
  const expected = fromJS({
    [todoId]: {
      description: 'todo',
      completed: false,
    },
  });

  expect(actual).toEqual(expected);
});

test('addTodoSuccess', () => {
  const todoId = 'todoId';
  const payload = { tempTodo: { id: todoId } };
  const state = tempTodosInitialState.set(todoId, $$Map({ description: 'todo', completed: true }));
  const action = actions.addTodoSuccess(payload);
  const actual = reducer(state, action);
  const expected = tempTodosInitialState;

  expect(actual).toEqual(expected);
});

describe('toggleTodo', () => {
  test('switches completed from true to false', () => {
    const todoId = 'todoId';
    const state = tempTodosInitialState.set(todoId, $$Map({ description: 'todo', completed: true }));
    const action = actions.toggleTodo(todoId);
    const actual = reducer(state, action);
    const expected = tempTodosInitialState.set(todoId, $$Map({ description: 'todo', completed: false }));

    expect(actual).toEqual(expected);
  });

  test('switches completed from false to true', () => {
    const todoId = 'todoId';
    const state = tempTodosInitialState.set(todoId, $$Map({ description: 'todo', completed: false }));
    const action = actions.toggleTodo(todoId);
    const actual = reducer(state, action);
    const expected = tempTodosInitialState.set(todoId, $$Map({ description: 'todo', completed: true }));

    expect(actual).toEqual(expected);
  });
});
