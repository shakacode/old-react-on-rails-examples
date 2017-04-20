// @flow
import { normalizeArrayToMap } from 'ror-common/libs/utils/normalizr';
import { rootReducerInitialState } from 'ror-common/reducers';
import type { Todo } from 'ror-common/types';
import assign from 'lodash/fp';

const composeInitialState = (railsProps: Array<Todo>) => {
  assign(rootReducerInitialState.todos, normalizeArrayToMap(railsProps));
  return rootReducerInitialState;
};

export default composeInitialState;
