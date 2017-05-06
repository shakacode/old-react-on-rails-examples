// @flow
import { buildActionType } from '../libs/utils/redux';

export const buildFormsActionType = buildActionType('forms');

export const editAddTodoForm = buildFormsActionType('editAddTodoForm');
