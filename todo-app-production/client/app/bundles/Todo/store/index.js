// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';

import rootReducer from './reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);

const store = props => createStore(
  rootReducer,
  Immutable.fromJS(props),
  compose(applyMiddleware(sagaMiddleware)),
);

export default store;

sagaMiddleware.run(rootSaga);
