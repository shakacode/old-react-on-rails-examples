// @flow
import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_TODO',
  'ADD_TODO_SUCCESS',
  'ADD_TODO_FAILURE',
  'REMOVE_TODO',
  'REMOVE_TODO_SUCCESS',
  'REMOVE_TODO_FAILURE',
  'TOGGLE_TODO',
]);

export default actionTypes;
