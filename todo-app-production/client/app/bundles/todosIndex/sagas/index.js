// @flow
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import type { putEffect, IOEffect } from 'redux-saga/effects';
import { callApi } from 'app/api';
import { addTodo as addTodoActionType, removeTodo as removeTodoActionType } from '../actions/todos/actionTypes';
import * as todosActions from '../actions/todos';
import type { numberAction, tempTodoAction } from '../types';

export function* addTodo(action: tempTodoAction): Generator<any, putEffect, any> {
  const { response, error } = yield call(callApi, action);
  if (response) {
    yield put(todosActions.addTodoSuccess({ todo: response.data, tempTodo: action.payload }));
  } else {
    yield put(todosActions.addTodoFailure(error.message));
  }
}

export function* removeTodo(action: numberAction): Generator<any, putEffect, any> {
  const { response, error } = yield call(callApi, action);
  if (response) {
    // But there is no data on a successful delete?
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
