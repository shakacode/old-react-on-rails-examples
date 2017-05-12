// @flow
import { call, put, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as api from '../api/todos';
import {
  normalizeObjectToMap,
  normalizeArrayToMap,
 } from '../libs/utils/normalizr';

import * as sagas from './index';
import * as todosActions from '../actions/todos';

describe('raceCallApi Generator Function', () => {
  it('handles async responses', () => {
    const action = todosActions.getTodos();
    fetch.mockResponseOnce(JSON.stringify([{description: "add a todo"}]));
    const generator = sagas.raceCallApi({
      apiCall: api.getTodos,
      successAction: todosActions.getTodosSuccess,
      failAction: todosActions.getTodosError,
      normalizer: normalizeArrayToMap,
    });

    let nextGen = generator.next();
    expect(nextGen.value).toEqual(race({
      response: call(api.getTodos),
      timeout: call(delay, 5000),
    }));
  });

  it('handles 400 errors', () => {
    const action = todosActions.getTodos();
    fetch.mockResponseOnce(
      JSON.stringify([{description: "Error."}]),
      {status: 400});
    const generator = sagas.raceCallApi({
      apiCall: api.getTodos,
      successAction: todosActions.getTodosSuccess,
      failAction: todosActions.getTodosError,
      normalizer: normalizeArrayToMap,
    });

    let nextGen = generator.next();
    expect(nextGen.value).toEqual({timeout: true});
  });
});
