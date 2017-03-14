// @flow
import React from 'react'; // eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';

import ActualApp from '../containers/App';

const App = () => (
  <AppContainer>
    <ActualApp />
  </AppContainer>
);

if (module.hot) {
  module.hot.accept('../containers/App', App);
}

export default App;
