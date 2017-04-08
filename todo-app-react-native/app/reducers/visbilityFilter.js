import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const visbilityFilter = createReducer('SHOW_ALL', {
  [types.SET_VISIBILITY_FILTER](state, action) {
    return action.filter;
  },
});

export default visbilityFilter;
