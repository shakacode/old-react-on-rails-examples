import * as types from '../actions/types';

export default function visbilityFilter(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case types.SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}
