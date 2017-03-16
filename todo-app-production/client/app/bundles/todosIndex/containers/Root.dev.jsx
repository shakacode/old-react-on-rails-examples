// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import DevTools from 'app/libs/utils/DevTools';

import AddTodoFormContainer from '../containers/AddTodoFormContainer';
import NavLinks from '../components/NavLinks';
import TodoListContainer from '../containers/TodoListContainer';

const Root = (wat: number) => (
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
);

export default Root;
