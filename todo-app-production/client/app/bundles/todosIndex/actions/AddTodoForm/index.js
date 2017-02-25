// @flow
import { createAction } from 'redux-actions';
import * as actionTypes from './actionTypes';

export const handleChange = createAction(actionTypes.EDIT_ADDTODOFORM);
