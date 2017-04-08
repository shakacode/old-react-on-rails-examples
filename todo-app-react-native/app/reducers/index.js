import { combineReducers } from 'redux';
import todos from './todos';
import visbilityFilter from './visbilityFilter';

export default combineReducers(Object.assign({
  todos,
  visbilityFilter,
}));
