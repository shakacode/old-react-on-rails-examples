import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Provider } from 'react-redux';

import Root from '../containers/Root';
import store from '../store';

const App = (railsProps: {}, _railsContext) => (
  <Provider store={store(railsProps)}>
    <Root />
  </Provider>
);

ReactOnRails.register({ App });
