// @flow
import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_TODO',
  'REMOVE_TODO',
  'TOGGLE_TODO',
]);

export default actionTypes;
