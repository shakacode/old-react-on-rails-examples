// @flow
import { call, put } from 'redux-saga/effects';

import * as api from 'app/api/todos';
import { normalizeArrayToMap } from 'app/libs/utils/normalizr';

import * as sagas from './index';
import * as todosActions from '../actions/todos';

describe('addTodo Saga', () => {
  it('handles async responses', () => {
    const description = 'todo description';

    const action = todosActions.addTodo(description);
    const generator = sagas.addTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(api.addTodo, description));

    const data = {
      id: 1,
      description: 'todo',
      completed: false,
      created_at: 'earlier',
      updated_at: 'also earlier',
    };
    const result = { response: { data } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.addTodoSuccess(normalizeArrayToMap([data]))));
  });

  it('handles async errors', () => {
    const description = 'todo description';

    const action = todosActions.addTodo(description);
    const generator = sagas.addTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(api.addTodo, description));

    const result = { error: { message: 'error!' } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.addTodoFailure(result.error.message)));
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

    const data = {
      id: 1,
      description: 'todo',
      completed: false,
      created_at: 'earlier',
      updated_at: 'also earlier',
    };
    const result = { response: { data } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.editTodoSuccess(normalizeArrayToMap([data]))));
  });

  it('handles async errors', () => {
    const description = 'todo description';
    const id = 'todoId';
    const payload = { description, id };

    const action = todosActions.editTodo(payload);
    const generator = sagas.editTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(api.editTodo, payload));

    const result = { error: { message: 'error!' } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.editTodoFailure(result.error.message)));
  });
});

describe('removeTodo Saga', () => {
  it('handles async responses', () => {
    const payload = '1';
    const action = todosActions.removeTodo(payload);
    const generator = sagas.removeTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(api.removeTodo, payload));

    const result = { response: { data: 'data' } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.removeTodoSuccess(result.response.data)));
  });

  it('handles async errors', () => {
    const payload = '1';
    const action = todosActions.removeTodo(payload);
    const generator = sagas.removeTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(api.removeTodo, payload));

    const result = { error: { message: 'error!' } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.removeTodoFailure(result.error.message)));
  });
});
