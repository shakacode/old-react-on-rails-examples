// @flow
import { createAction } from 'redux-actions';
import actionTypes from './actionTypes.js'

export default {
  handleChange: createAction(actionTypes.HANDLE_CHANGE),
  handleSubmit: createAction(actionTypes.HANDLE_SUBMIT),
};
