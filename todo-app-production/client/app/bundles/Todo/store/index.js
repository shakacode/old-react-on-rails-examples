// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

export default createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
