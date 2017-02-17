// @flow
import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'ADD_TODO',
  'REMOVE_TODO',
  'TOGGLE_TODO',
]);

// actionTypes = {HELLO_WORLD_NAME_UPDATE: "HELLO_WORLD_NAME_UPDATE"}
// Notice how we don't have to duplicate HELLO_WORLD_NAME_UPDATE twice
// thanks to mirror-creator.
export default actionTypes;
