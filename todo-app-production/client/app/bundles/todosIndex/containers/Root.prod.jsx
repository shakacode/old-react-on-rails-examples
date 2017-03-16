// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AddTodoFormContainer from '../containers/AddTodoFormContainer';
import NavLinks from '../components/NavLinks';
import TodoListContainer from '../containers/TodoListContainer';

const Root = () => (
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
);

export default Root;
