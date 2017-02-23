// @flow
import _ from 'lodash-uuid';
import { createAction } from 'redux-actions';
import actionTypes from './actionTypes';

export const addTodo = createAction(actionTypes.ADD_TODO);
export const addTodo = createAction(actionTypes.ADD_TEMP_TODO,
                                    (description: string) => {
                                       description,
                                       placeholderID: `TEMP_TODO_${_.uuid}`,
                                     });
export const toggleTodo = createAction(actionTypes.TOGGLE_TODO);
