// @flow
import _ from 'lodash/fp';

const toSnakeAndUpper = _.flow(_.snakeCase, _.toUpper);

/**
 * Makes action type strings
 * e.g.: buildActionType('todos', 'createSucceeded'); // 'TODOS__CREATE_SUCCEEDED'
 */
export const buildActionType = _.curry((namespace: string, actionName: string) =>
  _.flow(_.map(toSnakeAndUpper), _.join('__'))([namespace, actionName]));
