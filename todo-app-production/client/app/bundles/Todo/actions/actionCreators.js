// @flow
/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import actionTypes from './actionTypes.js'

export const addTodo = createAction(actionTypes.ADD_TODO);

export const removeTodo = createAction(actionTypes.REMOVE_TODO);

export const toggleTodo = createAction(actionTypes.TOGGLE_TODO);
