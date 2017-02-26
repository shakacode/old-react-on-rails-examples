// @flow
import { createAction } from 'redux-actions';
import { editAddTodoForm } from './actionTypes';

export const handleChange = createAction(editAddTodoForm);
