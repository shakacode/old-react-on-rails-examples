// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import AddTodoFormContainer from '../containers/AddTodoFormContainer';
import NavLinks from '../components/NavLinks';
import TodoListContainer from '../containers/TodoListContainer';

const Root = ({ store }: { store: {} }) => (
  <Provider store={store}>
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
    </div>
  </Provider>
);

export default Root;
