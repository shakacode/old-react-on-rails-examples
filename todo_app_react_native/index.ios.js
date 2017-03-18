/**
 *
 * Rect Native To Do App
 *
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer';
import * as todoList from './app/model/todoList';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ));
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({ visbilityFilter: todoList.SHOW_ALL, todos: [] });

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

AppRegistry.registerComponent('todo_app_react_native', () => App);
