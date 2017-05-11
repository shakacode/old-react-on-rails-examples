// @flow
import {
  call,
  put,
  fork,
  race,
  takeEvery
} from 'redux-saga/effects';
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

const API_TIMEOUT = 1000;

//TODO: Add a logging hook here so that the native app and the React app
// have a way to log out what happened if needed.

function* raceCallApi({apiCall, payload, successAction, failAction, normalizer}) {
  const { response, timeout } = yield race({
    response: payload ? call(apiCall, payload) : call(apiCall),
    timeout: call(api.delay, API_TIMEOUT),
  });

  if(response) {
    if(response.result) {
      if(normalizer) {
        yield put(successAction(normalizer(response.result)));
      } else {
        yield put(successAction(response.result));
      }
    } else {
      yield put(failAction(response.error));
    }
  } else {
    yield put(failAction(timeout));
  }
}

export function* addTodo({ payload }: stringPayload): Generator<any, putEffect, any> {
  yield call(raceCallApi,
    {
      apiCall: api.addTodo,
      payload,
      successAction: todosActions.addTodoSuccess,
      failAction: todosActions.addTodoError,
      normalizer: normalizeObjectToMap
    });
}

export function* editTodo({ payload }: descriptionPayload): Generator<any, putEffect, any> {
  yield call(raceCallApi,
    {
      apiCall: api.editTodo,
      payload,
      successAction: todosActions.editTodoSuccess,
      failAction: todosActions.editTodoError,
      normalizer: normalizeObjectToMap
    });
}

export function* removeTodo({ payload }: numberPayload): Generator<any, putEffect, any> {
  yield call(raceCallApi,
    {
      apiCall: api.removeTodo,
      payload,
      successAction: todosActions.removeTodoSuccess,
      failAction: todosActions.removeTodoError
    });
}

export function* toggleTodo({ payload }: togglePayload): Generator<any, putEffect, any> {
  yield call(raceCallApi,
    {
      apiCall: api.toggleTodo,
      payload,
      successAction: todosActions.toggleTodoSuccess,
      failAction: todosActions.toggleTodoError,
      normalizer: normalizeObjectToMap
    });
}

export function* getTodos(): Generator<any, putEffect, any> {
  yield call(raceCallApi,
    {
      apiCall: api.getTodos,
      successAction: todosActions.getTodosSuccess,
      failAction: todosActions.getTodosError,
      normalizer: normalizeArrayToMap
    });
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
