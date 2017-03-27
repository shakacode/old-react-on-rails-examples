/* @flow */

import { normalize as __normalize } from 'normalizr';
import _ from 'lodash/fp';

import { fromJS, Map as $$Map, OrderedSet as $$OrderedSet } from 'immutable';

import { toArray } from '../index';

export function normalizeMapIdKeys(entities: ?Object): $$Map<number, *> {
  return entities ? fromJS(entities).mapKeys(id => parseInt(id, 10)) : new $$Map();
}

// same thing as normal `normalize` except its keys are integers instead of strings
type Normalized = {
  entities: { [key: string]: $$Map<number, *> },
  result: $$OrderedSet<number>,
};

export function normalize(...args: Array<*>): Normalized {
  const { entities, result } = __normalize(...args);

  return {
    entities: _.mapValues(normalizeMapIdKeys, entities),
    result: new $$OrderedSet(toArray(result)),
  };
}

export const normalizeArray = _.reduce((acc: {}, item: { id: number }) => _.set(parseInt(item.id, 10), item, acc), {});

export const normalizeArrayToMap = _.flow(normalizeArray, normalizeMapIdKeys);

export const normalizeObjectToMap = object => normalizeMapIdKeys({ [parseInt(object.id, 10)]: object });
