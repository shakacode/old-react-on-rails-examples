/**
 *
 * React Native To Do App
 *
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import initializeStore from './app/store';
import AppContainer from './app/containers/AppContainer';

const store = initializeStore([]);

const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

AppRegistry.registerComponent('todo_app_react_native', () => App);
