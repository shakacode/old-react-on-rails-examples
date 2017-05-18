// @flow
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import type { putEffect, IOEffect } from 'redux-saga/effects';

import * as api from 'common/api/todos';
import { normalizeObjectToMap } from 'common/libs/utils/normalizr';

import {
  addTodo as addTodoActionType,
  editTodo as editTodoActionType,
  removeTodo as removeTodoActionType,
  toggleTodo as toggleTodoActionType,
} from '../actionTypes/todos';
import * as todosActions from '../actions/todos';
import type { numberPayload, stringPayload, descriptionPayload, togglePayload } from '../types';

export function* addTodo({ payload }: stringPayload): Generator<any, putEffect, any> {
  const response = yield call(api.addTodo, payload);
  yield put(todosActions.addTodoSuccess(normalizeObjectToMap(response)));
}

export function* editTodo({ payload }: descriptionPayload): Generator<any, putEffect, any> {
  const response = yield call(api.editTodo, payload);
  console.log(`response: ${JSON.stringify(response)}`);
  const norm = normalizeObjectToMap(response);
  console.log(`normalized: ${JSON.stringify(norm)}`);
  yield put(todosActions.editTodoSuccess(norm));
}

export function* removeTodo({ payload }: numberPayload): Generator<any, putEffect, any> {
  const response = yield call(api.removeTodo, payload);
  yield put(todosActions.removeTodoSuccess(response));
}

export function* toggleTodo({ payload }: togglePayload): Generator<any, putEffect, any> {
  const response = yield call(api.toggleTodo, payload);
  yield put(todosActions.toggleTodoSuccess(normalizeObjectToMap(response)));
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

export default function* root(): Generator<IOEffect, any, any> {
  yield fork(addTodoSaga);
  yield fork(editTodoSaga);
  yield fork(removeTodoSaga);
  yield fork(toggleTodoSaga);
}
