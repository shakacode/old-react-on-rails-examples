// @flow
import { createAction } from 'redux-actions';
import actionTypes from './actionTypes.js'

export default {
  addTodo: createAction(actionTypes.ADD_TODO),
  removeTodo: createAction(actionTypes.REMOVE_TODO),
  toggleTodo: createAction(actionTypes.TOGGLE_TODO),
};
