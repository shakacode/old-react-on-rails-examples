import * as sagas from './index.js';
import { call, put } from 'redux-saga/effects';
import { handleSubmit } from '../actions/AddTodoForm';
import { removeTodo } from '../actions/todos';
import * as todosActions from '../actions/todos';
import * as api from '../../../api';

test('addTodo Saga handles async responses', () => {
  const payload = 'todo description';
  const action = handleSubmit(payload);
  const generator = sagas.addTodo(action);

  let nextGen = generator.next();
  expect(nextGen.value).toEqual(put(todosActions.addTodo(payload)));

  nextGen = generator.next();
  expect(nextGen.value).toEqual(call(api.addTodo, payload));

  const result = { response: { data: 'data' }};
  nextGen = generator.next(result);
  expect(nextGen.value).toEqual(put(todosActions.addTodoSuccess(result.response.data)));
})

test('addTodo Saga handles async errors', () => {
  const payload = 'todo description';
  const action = handleSubmit(payload);
  const generator = sagas.addTodo(action);

  let nextGen = generator.next();
  expect(nextGen.value).toEqual(put(todosActions.addTodo(payload)));

  nextGen = generator.next();
  expect(nextGen.value).toEqual(call(api.addTodo, payload));

  const result = { error: { message: 'error!' }};
  nextGen = generator.next(result);
  expect(nextGen.value).toEqual(put(todosActions.addTodoFailure(result.error.message)));
})

test('removeTodo Saga handles async responses', () => {
  const payload = '1';
  const action = removeTodo(payload);
  const generator = sagas.removeTodo(action);

  let nextGen = generator.next();
  expect(nextGen.value).toEqual(call(api.removeTodo, payload));

  const result = { response: { data: 'data' }};
  nextGen = generator.next(result);
  expect(nextGen.value).toEqual(put(todosActions.removeTodoSuccess(result.response.data)));
})

test('removeTodo Saga handles async errors', () => {
  const payload = '1';
  const action = removeTodo(payload);
  const generator = sagas.removeTodo(action);

  let nextGen = generator.next();
  expect(nextGen.value).toEqual(call(api.removeTodo, payload));

  const result = { error: { message: 'error!' }};
  nextGen = generator.next(result);
  expect(nextGen.value).toEqual(put(todosActions.removeTodoFailure(result.error.message)));
})
