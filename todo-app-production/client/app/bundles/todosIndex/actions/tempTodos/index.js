// @flow
import _ from 'lodash';
import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const addTodo = createAction(actionTypes.ADD_TODO);
export const addTempTodo = createAction(actionTypes.ADD_TEMP_TODO,
  (description: string, id: string = _.uniqueId('TEMP_TODO_')) => ({ description, id }));
export const toggleTodo = createAction(actionTypes.TOGGLE_TODO);
