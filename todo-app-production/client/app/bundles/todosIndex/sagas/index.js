// @flow
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import type { putEffect, IOEffect } from 'redux-saga/effects';
import * as api from '../../../api';
import { ADD_TODO, REMOVE_TODO } from '../actions/todos/actionTypes';
import * as todosActions from '../actions/todos';
import type { numberPayload, tempTodoPayload } from '../types';

export function* addTodo({ payload }: tempTodoPayload): Generator<any, putEffect, any> {
  const { response, error } = yield call(api.addTodo, payload);
  if (response) {
    yield put(todosActions.addTodoSuccess({ Todo: response.data, tempTodo: payload }));
  } else {
    yield put(todosActions.addTodoFailure(error.message));
  }
}

export function* removeTodo({ payload }: numberPayload): Generator<any, putEffect, any> {
  const { response, error } = yield call(api.removeTodo, payload);
  if (response) {
    yield put(todosActions.removeTodoSuccess(response.data));
  } else {
    yield put(todosActions.removeTodoFailure(error.message));
  }
}

function* addTodoSaga() {
  yield takeEvery(ADD_TODO, addTodo);
}

function* removeTodoSaga() {
  yield takeEvery(REMOVE_TODO, removeTodo);
}

export default function* root(): Generator<IOEffect, any, any> {
  yield fork(addTodoSaga);
  yield fork(removeTodoSaga);
}
