// @flow
import { normalizeArrayToMap } from 'app/libs/utils/normalizr';

import { rootReducerInitialState } from '../reducers';
import type { Todo } from '../types';

// TODO: hydrate initial state with rails props
const composeInitialState = (railsProps: Array<Todo>) => {
  Object.assign(rootReducerInitialState.todos, normalizeArrayToMap(railsProps));
  return rootReducerInitialState;
};

export default composeInitialState;
