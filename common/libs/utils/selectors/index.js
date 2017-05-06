// @flow
import { List as $$List, Map as $$Map, Set as $$Set, is } from 'immutable';
import { createSelectorCreator, defaultMemoize } from 'reselect';

export { createSelector as createCommonSelector } from 'reselect';
export const createImmutableSelector = createSelectorCreator(defaultMemoize, (currentVal, previousVal) =>
  is(currentVal, previousVal));

export function mapToJsArray(entities: $$Map<any, any> | $$Set<any>) {
  // eslint-disable-next-line no-confusing-arrow
  return entities.map($$entity => $$entity.toJS ? $$entity.toJS() : $$entity).toArray();
}

export function listOfMapsToJsArray(list: $$List<$$Map<any, any>>) {
  return list.map($$map => $$map.toJS()).toArray();
}
