// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

import rootReducer from 'ror-common/reducers';
import rootSaga from 'ror-common/sagas';
import composeInitialState from './composeInitalState';
import type { Todo } from 'ror-common/types';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const initializeStore = (railsProps: Array<Todo>) => {
  const store = createStore(
    rootReducer,
    composeInitialState(railsProps),
    compose(applyMiddleware(sagaMiddleware, loggerMiddleware)));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default initializeStore;
