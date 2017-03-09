// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import DevTools from 'app/libs/utils/DevTools';

import store from '../store';
import AddTodoFormContainer from '../containers/AddTodoFormContainer';
import NavLinks from '../components/NavLinks';
import TodoListContainer from '../containers/TodoListContainer';

const App = (railsProps: {}, _railsContext) => (
  <Provider store={store(railsProps)}>
    <div>
      <Router basename="/todos">
        <Route path="/:filter">
          {_matchProps => (
            <div>
              <AddTodoFormContainer />
              <NavLinks />
              <TodoListContainer />
            </div>
          )}
        </Route>
      </Router>
      <DevTools />
    </div>
  </Provider>
);

ReactOnRails.register({ App });
