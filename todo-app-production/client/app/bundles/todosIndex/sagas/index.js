// @flow
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import type { putEffect, IOEffect } from 'redux-saga/effects';

import * as api from 'app/api/todos';
import { normalizeObjectToMap } from 'app/libs/utils/normalizr';

import {
  addTodo as addTodoActionType,
  removeTodo as removeTodoActionType,
  editTodo as editTodoActionType,
} from '../actionTypes/todos';
import * as todosActions from '../actions/todos';
import type { numberPayload, stringPayload, descriptionPayload } from '../types';

export function* addTodo({ payload }: stringPayload): Generator<any, putEffect, any> {
  const response = yield call(api.addTodo, payload);
  yield put(todosActions.addTodoSuccess(normalizeObjectToMap([response.data])));
}

export function* editTodo({ payload }: descriptionPayload): Generator<any, putEffect, any> {
  const response = yield call(api.editTodo, payload);
  yield put(todosActions.editTodoSuccess(normalizeObjectToMap([response.data])));
}

export function* removeTodo({ payload }: numberPayload): Generator<any, putEffect, any> {
  const response = yield call(api.removeTodo, payload);
  yield put(todosActions.removeTodoSuccess(response.data));
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

export default function* root(): Generator<IOEffect, any, any> {
  yield fork(addTodoSaga);
  yield fork(editTodoSaga);
  yield fork(removeTodoSaga);
}
