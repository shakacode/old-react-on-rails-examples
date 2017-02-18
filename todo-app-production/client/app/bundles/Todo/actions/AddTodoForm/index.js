// @flow
import { createAction } from 'redux-actions';
import actionTypes from './actionTypes.js'

export const handleChange = createAction(actionTypes.EDIT_ADDTODOFORM);
export const handleSubmit = createAction(actionTypes.SUBMIT_ADDTODOFORM);
