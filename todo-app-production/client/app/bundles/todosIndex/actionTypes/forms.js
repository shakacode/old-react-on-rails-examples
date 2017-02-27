// @flow
import { buildActionType } from 'app/libs/utils/redux';

export const buildFormsActionType = buildActionType('forms');

export const editAddTodoForm = buildFormsActionType('editAddTodoForm');
