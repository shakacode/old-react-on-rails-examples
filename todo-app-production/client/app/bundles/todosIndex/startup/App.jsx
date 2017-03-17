import React from 'react';
import ReactOnRails from 'react-on-rails';

import Root from '../containers/Root';
import store from '../store';

const App = (railsProps: {}, _railsContext) => <Root store={store(railsProps)} />;

ReactOnRails.register({ App });
