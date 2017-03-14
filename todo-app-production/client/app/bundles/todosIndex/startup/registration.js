// @flow
import ReactOnRails from 'react-on-rails';

import App from './App';
import todoListStore from '../store';

ReactOnRails.register({ App });

ReactOnRails.registerStore({ todoListStore });
