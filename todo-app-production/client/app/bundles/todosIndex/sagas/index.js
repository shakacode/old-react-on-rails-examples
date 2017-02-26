// @flow
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import type { putEffect, IOEffect } from 'redux-saga/effects';
import * as api from '../../../api';
import { addTodo as addTodoActionType, removeTodo as removeTodoActionType } from '../actions/todos/actionTypes';
import * as todosActions from '../actions/todos';
import type { numberPayload, tempTodoPayload } from '../types';

export function* addTodo({ payload }: tempTodoPayload): Generator<any, putEffect, any> {
  const { response, error } = yield call(api.addTodo, payload);
  if (response) {
    yield put(todosActions.addTodoSuccess({ todo: response.data, tempTodo: payload }));
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
  yield takeEvery(addTodoActionType, addTodo);
}

function* removeTodoSaga() {
  yield takeEvery(removeTodoActionType, removeTodo);
}

export default function* root(): Generator<IOEffect, any, any> {
  yield fork(addTodoSaga);
  yield fork(removeTodoSaga);
}
