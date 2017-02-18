/* eslint-disable no-console */
import { call, put, fork, takeEvery } from 'redux-saga/effects';
import * as api from '../../../../api';
import AddTodoFormActionTypes from '../constants/AddTodoForm/actionTypes';
import todosActionTypes from '../constants/todos/actionTypes';
import * as AddTodoFormActions from '../actions/AddTodoForm';
import * as todosActions from '../actions/todos';

export function* addTodo({ payload }) {
  yield put(todosActions.addTodo(payload));
  const { response, error } = yield call(api.addTodo, payload);
  if(response)
    yield put(todosActions.addTodoSuccess(response.data));
  else
    yield put(todosActions.addTodoFailure(error.message));
}

export function* removeTodo({ payload }) {
  const { response, error } = yield call(api.removeTodo, payload);
  if(response)
    yield put(todosActions.removeTodoSuccess(response.data));
  else
    yield put(todosActions.removeTodoFailure(error.message));
}

function* addTodoSaga() {
  yield takeEvery(AddTodoFormActionTypes.SUBMIT_ADDTODOFORM, addTodo);
}

function* removeTodoSaga() {
  yield takeEvery(todosActionTypes.REMOVE_TODO, removeTodo);
}

export default function* root() {
  yield fork(addTodoSaga);
  yield fork(removeTodoSaga);
}
