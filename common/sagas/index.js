// @flow
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import type { putEffect, IOEffect } from 'redux-saga/effects';

import * as api from '../api/todos';
import {
  normalizeObjectToMap,
  normalizeArrayToMap,
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
} from '../types';

// TODO: Add a logging hook here so that the native app and the React app
// have a way to log out what happened if needed.

export function* addTodo({ payload }: stringPayload): Generator<any, putEffect, any> {
  try {
    const response = yield call(api.addTodo, payload);
    yield put(todosActions.addTodoSuccess(normalizeObjectToMap(response)));
  } catch (e) {
    yield put(todosActions.addTodoError());
  }
}

export function* editTodo({ payload }: descriptionPayload): Generator<any, putEffect, any> {
  try {
    const response = yield call(api.editTodo, payload);
    yield put(todosActions.editTodoSuccess(normalizeObjectToMap(response)));
  } catch (e) {
    yield put(todosActions.editTodoError());
  }
}

export function* removeTodo({ payload }: numberPayload): Generator<any, putEffect, any> {
  try {
    const response = yield call(api.removeTodo, payload);
    yield put(todosActions.removeTodoSuccess(response));
  } catch (e) {
    yield put(todosActions.removeTodoError());
  }
}

export function* toggleTodo({ payload }: togglePayload): Generator<any, putEffect, any> {
  try {
    const response = yield call(api.toggleTodo, payload);
    yield put(todosActions.toggleTodoSuccess(normalizeObjectToMap(response)));
  } catch (e) {
    yield put(todosActions.toggleTodoError());
  }
}

// TODO: Clean up exception handling here - this can have bad side effects
// with React, per: https://github.com/redux-saga/redux-saga/issues/521
// Recommended to catch API exceptions in API and then return an error
// object here, also use race() to deal with flaky cellular and browser data

export function* getTodos(): Generator<any, putEffect, any> {
  try {
    const response = yield call(api.getTodos);
    const objectMap = normalizeArrayToMap(response);
    yield put(todosActions.getTodosSuccess(objectMap));
  } catch (e) {
    yield put(todosActions.getTodosError());
  }
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
