import { call, put } from 'redux-saga/effects';

import { callApi } from 'app/api';

import * as sagas from './index';
import * as todosActions from '../actions/todos';

describe('addTodo Saga', () => {
  it('handles async responses', () => {
    const description = 'todo description';
    const id = 'todoId';
    const payload = { description, id };

    const action = todosActions.addTodo(description, id);
    const generator = sagas.addTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(callApi, action));

    const result = { response: { data: 'data' } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.addTodoSuccess({ todo: result.response.data, tempTodo: payload })));
  });

  it('handles async errors', () => {
    const description = 'todo description';
    const id = 'todoId';

    const action = todosActions.addTodo(description, id);
    const generator = sagas.addTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(callApi, action));

    const result = { error: { message: 'error!' } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.addTodoFailure(result.error.message)));
  });
});

describe('removeTodo Saga', () => {
  it('handles async responses', () => {
    const payload = '1';
    const action = todosActions.removeTodo(payload);
    const generator = sagas.removeTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(callApi, action));

    const result = { response: { data: 'data' } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.removeTodoSuccess(result.response.data)));
  });

  it('handles async errors', () => {
    const payload = '1';
    const action = todosActions.removeTodo(payload);
    const generator = sagas.removeTodo(action);

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(call(callApi, action));

    const result = { error: { message: 'error!' } };
    nextGen = generator.next(result);
    expect(nextGen.value).toEqual(put(todosActions.removeTodoFailure(result.error.message)));
  });
});
