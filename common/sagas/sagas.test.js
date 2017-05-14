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
      response: call(api.getTodos, undefined),
      timeout: call(delay, 5000),
    }));
  });

  // TODO: Right now the timeout delay is hard coded to 5 sec but this needs
  // to be thought out a little more
  it('handles timed out responses (over 6000 ms)', () => {
    const action = todosActions.getTodos();
    const delay = () => { return new Promise((resolve) => {
        setTimeout(() => resolve({url: '/delayed', delay: 500}), 6000);
      })
    };
    fetch.mockResponseOnce(JSON.stringify([{description: "add a todo"}]), delay);
    const generator = sagas.raceCallApi({
      apiCall: api.getTodos,
      successAction: todosActions.getTodosSuccess,
      failAction: todosActions.getTodosError,
      normalizer: normalizeArrayToMap,
    });

    let nextGen = generator.next();
    let nextGen1 = generator.next(nextGen.value);
    expect(nextGen1.value).toEqual(put(todosActions.timeoutTodo()));
  });
});
