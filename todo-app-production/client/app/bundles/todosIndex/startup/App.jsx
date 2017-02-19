// @flow
import React from 'react';
import { Redirect } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import store from '../store';
import AddTodoFormContainer from '../containers/AddTodoFormContainer';
import NavLinks from '../components/NavLinks';
import TodoListContainer from '../containers/TodoListContainer';
import type { MappedTodo } from '../types';

const App = (props: MappedTodo, _railsContext) => (
  <Provider store={store(props)}>
    <Router basename="/todos">
      <div>
        <Route exact path="" render={() => <Redirect push to="/pending" />} />
        <Route
          path="/:filter"
          render={({ match }) => (
            <div>
              <AddTodoFormContainer />
              <NavLinks />
              <TodoListContainer
                path={match.parameters.filter}
                {...props}
              />
            </div>)}
        />
      </div>
    </Router>
  </Provider>
);

ReactOnRails.register({ App });
