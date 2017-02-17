// @flow
import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import store from '../store';
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import TodoListContainer from '../containers/TodoListContainer'

const App = (props, _railsContext) => (
  <Provider store={store}>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Provider>
);

ReactOnRails.register({ App });
