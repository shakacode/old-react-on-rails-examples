import { Map as $$Map, fromJS } from 'immutable';
import * as actions from '../actions/todos';
import reducer, { todosInitialState } from './todosReducer';

test('addTodo', () => {
  const todoId = 0;
  const state = fromJS({});
  const action = actions.addTodo({ description: 'todo' });
  const actual = reducer(state, action).toJS();
  const expected = { [todoId]: { description: 'todo',
    completed: false,
    temp: true } };
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
