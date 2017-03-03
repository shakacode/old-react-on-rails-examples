// @flow
import { addTodoFailure, removeTodoFailure } from '../actions/todos';
import reducer, { errorsInitialState } from './errorsReducer';

test('addTodoFailure', () => {
  const payload = 'error message';
  const state = errorsInitialState;
  const action = addTodoFailure(payload);

  const actual = reducer(state, action);
  const expected = state.push(payload);

  expect(actual).toEqual(expected);
});

test('removeTodoFailure', () => {
  const payload = 'error message';
  const state = errorsInitialState;
  const action = removeTodoFailure(payload);

  const actual = reducer(state, action);
  const expected = state.push(payload);

  expect(actual).toEqual(expected);
});
