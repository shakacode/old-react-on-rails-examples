// @flow
import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_TODO',
  'ADD_TEMP_TODO',
  'TOGGLE_TODO',
]);

export default actionTypes;
