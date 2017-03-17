// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import DevTools from 'app/libs/utils/DevTools';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import composeInitialState from './composeInitialState';

const sagaMiddleware = createSagaMiddleware();

const initializeStore = (railsProps: {}) => {
  const store = createStore(
    rootReducer,
    composeInitialState(railsProps),
    compose(applyMiddleware(sagaMiddleware), DevTools.instrument()),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default initializeStore;
