// @flow
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import type { putEffect, IOEffect } from 'redux-saga/effects';
import * as api from '../../../api';
import AddTodoFormActionTypes from '../actions/AddTodoForm/actionTypes';
import todosActionTypes from '../actions/todos/actionTypes';
import * as todosActions from '../actions/todos';
import placeholderIDGenerator from '../services/placeholderIDGeneretor';
import type { stringPayload, numberPayload } from '../types';

export function* addTodo({ payload }: stringPayload): Generator<any, putEffect, any> {
  const placeholderID = yield call(placeholderIDGenerator);
  yield put(todosActions.addTodo({ placeholderID, description: payload }));
  const { response, error } = yield call(api.addTodo, payload);
  if (response) {
    yield put(todosActions.addTodoSuccess(response.data));
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
  yield takeEvery(AddTodoFormActionTypes.SUBMIT_ADDTODOFORM, addTodo);
}

function* removeTodoSaga() {
  yield takeEvery(todosActionTypes.REMOVE_TODO, removeTodo);
}

export default function* root(): Generator<IOEffect, any, any> {
  yield fork(addTodoSaga);
  yield fork(removeTodoSaga);
}
