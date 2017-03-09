// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';

import DevTools from 'app/libs/utils/DevTools';

import AddTodoFormContainer from './AddTodoFormContainer';
import TodoListContainer from './TodoListContainer';
import NavLinks from '../components/NavLinks';

const store = ReactOnRails.getStore('todoListStore');

const App = () => (
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
      <DevTools />
    </div>
  </Provider>
);

export default App;
