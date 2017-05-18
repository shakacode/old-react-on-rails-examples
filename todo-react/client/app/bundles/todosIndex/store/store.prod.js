// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import composeInitialState from './composeInitialState';
import type { Todo } from '../types';

const sagaMiddleware = createSagaMiddleware();

const initializeStore = (railsProps: Array<Todo>) => {
  const store = createStore(rootReducer, composeInitialState(railsProps), compose(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default initializeStore;
