// @flow
import { normalizeArrayToMap } from 'app/libs/utils/normalizr';

import { rootReducerInitialState } from '../reducers';

// TODO: hydrate initial state with rails props
const composeInitialState = railsProps => Object.assign(rootReducerInitialState.todos, normalizeArrayToMap(railsProps));

export default composeInitialState;
