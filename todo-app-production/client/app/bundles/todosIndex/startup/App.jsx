// @flow
import React from 'react'; // eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';

import actualApp from '../containers/App';

const App = (child: () => React$Element<any>) => (
  <AppContainer>
    <child />
  </AppContainer>
);

App(actualApp);

if (module.hot) {
  module.hot.accept('../containers/App', () => {
    App(actualApp);
  });
}

export default App;
