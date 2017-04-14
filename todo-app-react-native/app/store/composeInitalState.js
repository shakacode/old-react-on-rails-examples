// @flow
import { normalizeArrayToMap } from 'ror-common/libs/utils/normalizr';
import { rootReducerInitialState } from 'ror-common/reducers';
import type { Todo } from 'ror-common/types';

// TODO: hydrate initial state with rails props
const composeInitialState = (railsProps: Array<Todo>) => {
  Object.assign(rootReducerInitialState.todos, normalizeArrayToMap(railsProps));
  return rootReducerInitialState;
};

export default composeInitialState;
