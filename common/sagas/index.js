// @flow
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import type { putEffect, IOEffect } from 'redux-saga/effects';

import * as api from '../api/todos';
import {
  normalizeObjectToMap,
  normalizeArrayToMap
} from '../libs/utils/normalizr';

import {
  addTodo as addTodoActionType,
  editTodo as editTodoActionType,
  removeTodo as removeTodoActionType,
  toggleTodo as toggleTodoActionType,
  getTodos as getTodosActionType,
} from '../actionTypes/todos';
import * as todosActions from '../actions/todos';
import type {
  numberPayload,
  stringPayload,
  descriptionPayload,
  togglePayload,
  getTodosPayload,
} from '../types';

//TODO: Add a logging hook here so that the native app and the React app
// have a way to log out what happened if needed.

function* checkResponse(response, successAction, failAction, normalizer) {
  if(response.result) {
    if(normalizer) {
      yield put(successAction(normalizer(response.result)));
    } else {
      yield put(successAction(response.result));
    }
  } else {
    yield put(failAction(response.error));
  }
}

export function* addTodo({ payload }: stringPayload): Generator<any, putEffect, any> {
  const response = yield call(api.addTodo, payload);
  yield checkResponse(
    response,
    todosActions.addTodoSuccess,
    todosActions.addTodoError,
    normalizeObjectToMap);
}

export function* editTodo({ payload }: descriptionPayload): Generator<any, putEffect, any> {
  const response = yield call(api.editTodo, payload);
  yield checkResponse(
    response,
    todosActions.editTodoSuccess,
    todosActions.editTodoError,
    normalizeObjectToMap);
}

export function* removeTodo({ payload }: numberPayload): Generator<any, putEffect, any> {
  const response = yield call(api.removeTodo, payload);
  yield checkResponse(
    response,
    todosActions.removeTodoSuccess,
    todosActions.removeTodoError);
}

export function* toggleTodo({ payload }: togglePayload): Generator<any, putEffect, any> {
  const response = yield call(api.toggleTodo, payload);
  yield checkResponse(
    response,
    todosActions.toggleTodoSuccess,
    todosActions.toggleTodoError,
    normalizeObjectToMap);
}

// TODO: Clean up exception handling here - this can have bad side effects
// with React, per: https://github.com/redux-saga/redux-saga/issues/521
// Recommended to catch API exceptions in API and then return an error
// object here, also use race() to deal with flaky cellular and browser data

export function* getTodos(): Generator<any, putEffect, any> {
  const response = yield call(api.getTodos);
  yield checkResponse(response,
    todosActions.getTodosSuccess,
    todosActions.getTodosError,
    normalizeArrayToMap);
}

function* addTodoSaga() {
  yield takeEvery(addTodoActionType, addTodo);
}

function* editTodoSaga() {
  yield takeEvery(editTodoActionType, editTodo);
}

function* removeTodoSaga() {
  yield takeEvery(removeTodoActionType, removeTodo);
}

function* toggleTodoSaga() {
  yield takeEvery(toggleTodoActionType, toggleTodo);
}

function* getTodoSaga() {
  yield takeEvery(getTodosActionType, getTodos);
}

// TODO: Add a restart saga so that exceptions do not cause app crashes.
// See: https://github.com/redux-saga/redux-saga/pull/644

export default function* root(): Generator<IOEffect, any, any> {
  yield fork(getTodoSaga);
  yield fork(addTodoSaga);
  yield fork(editTodoSaga);
  yield fork(removeTodoSaga);
  yield fork(toggleTodoSaga);
}
