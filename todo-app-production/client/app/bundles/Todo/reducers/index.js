import { combineReducers } from 'redux'
import todosReducer from './todos'
import filterReducer from './visibilityFilter'

const reducers = combineReducers({
  todosReducer,
  filterReducer
})

export default reducers
