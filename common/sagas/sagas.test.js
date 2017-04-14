// @flow
import { call, put } from 'redux-saga/effects';

import * as api from '../api/todos';
import { normalizeObjectToMap } from '../utils/normalizr';

import * as sagas from './index';
import * as todosActions from '../actions/todos';

// TODO: Fix all the tests in common

describe('addTodo Saga', () => {
  it('handles async responses', () => {
    const description = 'todo description';

    const action = todosActions.addTodo(description);
    const generator = sagas.addTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(api.addTodo, description));

    const result = {
      id: 1,
      description: 'todo',
      completed: false,
      created_at: 'earlier',
      updated_at: 'also earlier',
    };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.addTodoSuccess(normalizeObjectToMap(result))));
  });
});

describe('editTodo Saga', () => {
  it('handles async responses', () => {
    const description = 'todo description';
    const id = 'todoId';
    const payload = { description, id };

    const action = todosActions.editTodo(payload);
    const generator = sagas.editTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(api.editTodo, payload));

    const result = {
      id: 1,
      description: 'todo',
      completed: false,
      created_at: 'earlier',
      updated_at: 'also earlier',
    };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.editTodoSuccess(normalizeObjectToMap(result))));
  });
});

describe('removeTodo Saga', () => {
  it('handles async responses', () => {
    const payload = '1';
    const action = todosActions.removeTodo(payload);
    const generator = sagas.removeTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(api.removeTodo, payload));

    const result = 'data';
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.removeTodoSuccess(result)));
  });
});

describe('toggleTodo Saga', () => {
  it('handles async responses', () => {
    const id = 'todoId';
    const payload = { id, complete: true };

    const action = todosActions.toggleTodo(payload);
    const generator = sagas.toggleTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(api.toggleTodo, payload));

    const result = {
      id: 1,
      description: 'todo',
      completed: false,
      created_at: 'earlier',
      updated_at: 'also earlier',
    };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.toggleTodoSuccess(normalizeObjectToMap(result))));
  });
});
