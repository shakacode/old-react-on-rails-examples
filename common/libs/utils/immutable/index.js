// @flow
import { Map as $$Map } from 'immutable';
import _ from 'lodash/fp';

import { toArray } from '../../utils';

type Immutable = $$Map;
type Path = Array<string | number>;

// calls `toJS` if given object is immutable, returns the object unchanged otherwise
export const toJS = (obj: {}) => (_.isFunction(_.get('toJS', obj)) ? obj.toJS() : obj);

// adds an item to a nested immutable $$Set
export const unionIn = _.curry(
  (path: Path, item: any, $$immutable: Immutable) =>
    $$immutable.updateIn(path, $$nestedSet => $$nestedSet.union(toArray(item))),
);

// removes an item from a nested immutable $$Set
export const subtractIn = _.curry(
  (path: Path, item: any, $$immutable: Immutable) =>
    $$immutable.updateIn(path, $$nestedSet => $$nestedSet.subtract(toArray(item))),
);

// clears a nested immutable $$Set
export const clearIn = _.curry(
  (path: Path, $$immutable: Immutable) =>
    $$immutable.updateIn(path, $$nestedSet => $$nestedSet.clear()),
);

// pushes an item to a nested $$List
export const pushIn = _.curry(
  (path: Path, item: any, $$immutable: Immutable) =>
    $$immutable.updateIn(path, $$nestedList => $$nestedList.push(item)),
);

// deletes an item from a nested $$List
export const deleteIn = _.curry(
  (path: Path, targetIndex: number, $$immutable: Immutable) =>
    $$immutable.updateIn(path, $$nestedList => $$nestedList.delete(targetIndex)),
);

// removes items in nested $$List for which predicate returns true
export const rejectIn = _.curry(
  (path: Path, predicate: Function, $$immutable: Immutable) =>
    $$immutable.updateIn(path, $$nestedList => $$nestedList.filterNot(predicate)),
);

// removes items in nested $$List for which predicate returns false
export const filterIn = _.curry(
  (path: Path, predicate: Function, $$immutable: Immutable) =>
    $$immutable.updateIn(path, $$nestedList => $$nestedList.filter(predicate)),
);
