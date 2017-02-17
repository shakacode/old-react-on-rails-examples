// @flow
import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import store from '../store';
import AddTodo from '../containers/AddTodo'
import NavLinks from '../components/NavLinks'
import TodoListContainer from '../containers/TodoListContainer'

const App = (props, _railsContext) => (
  <Provider store={store(props)}>
    <Router basename="/todos">
      <div>
        <Route exact path="" render={() => <Redirect push to='/pending'/>} />
        {['/pending', '/completed', '/all'].map(path =>
          <Route path={path} render={props => (
              <AddTodo />
              <NavLinks />
              <TodoListContainer path={path} {...props} />
          )} />
        }
      </div>
    </Router>
  </Provider>
);

ReactOnRails.register({ App });
