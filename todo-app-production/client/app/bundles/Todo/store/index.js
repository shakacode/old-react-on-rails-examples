// @flow
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import rootReducer from '../reducers';
import rootSaga from '../sagas';
import type { MappedTodo } from '../types';

const sagaMiddleware = createSagaMiddleware();

const store = (props: MappedTodo) => createStore(
  rootReducer,
  fromJS(props),
  compose(applyMiddleware(sagaMiddleware)),
);

export default store;

sagaMiddleware.run(rootSaga);
