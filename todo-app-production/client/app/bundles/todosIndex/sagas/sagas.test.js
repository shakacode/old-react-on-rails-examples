import { call, put } from 'redux-saga/effects';

import * as api from '../../../api';

import * as sagas from './index';
import * as todosActions from '../actions/todos';

test('addTodo Saga handles async responses', () => {
  const description = 'todo description';
  const id = 'todoId';
  const payload = { description, id };

  const action = todosActions.addTodo(description, id);
  const generator = sagas.addTodo(action);

  let nextGen = generator.next();
  expect(nextGen.value).toEqual(call(api.addTodo, payload));

  const result = { response: { data: 'data' } };
  nextGen = generator.next(result);
  expect(nextGen.value).toEqual(put(todosActions.addTodoSuccess({ todo: result.response.data, tempTodo: payload })));
});

test('addTodo Saga handles async errors', () => {
  const description = 'todo description';
  const id = 'todoId';
  const payload = { description, id };

  const action = todosActions.addTodo(description, id);
  const generator = sagas.addTodo(action);

  let nextGen = generator.next();
  expect(nextGen.value).toEqual(call(api.addTodo, payload));

  const result = { error: { message: 'error!' } };
  nextGen = generator.next(result);
  expect(nextGen.value).toEqual(put(todosActions.addTodoFailure(result.error.message)));
});

test('removeTodo Saga handles async responses', () => {
  const payload = '1';
  const action = todosActions.removeTodo(payload);
  const generator = sagas.removeTodo(action);

  let nextGen = generator.next();
  expect(nextGen.value).toEqual(call(api.removeTodo, payload));

  const result = { response: { data: 'data' } };
  nextGen = generator.next(result);
  expect(nextGen.value).toEqual(put(todosActions.removeTodoSuccess(result.response.data)));
});

test('removeTodo Saga handles async errors', () => {
  const payload = '1';
  const action = todosActions.removeTodo(payload);
  const generator = sagas.removeTodo(action);

  let nextGen = generator.next();
  expect(nextGen.value).toEqual(call(api.removeTodo, payload));

  const result = { error: { message: 'error!' } };
  nextGen = generator.next(result);
  expect(nextGen.value).toEqual(put(todosActions.removeTodoFailure(result.error.message)));
});
