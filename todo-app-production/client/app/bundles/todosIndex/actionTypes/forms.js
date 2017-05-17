// @flow
import { buildActionType } from 'common/libs/utils/redux';

export const buildFormsActionType = buildActionType('forms');

export const editAddTodoForm = buildFormsActionType('editAddTodoForm');
