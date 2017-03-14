import { combineReducers } from 'redux';
import * as todos from './todos';
import * as visbilityFilter from './visbilityFilter';

export default combineReducers(Object.assign(
  todos,
  visbilityFilter,
));
