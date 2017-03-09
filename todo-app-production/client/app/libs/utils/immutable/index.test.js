import { fromJS, Map as $$Map, Set as $$Set } from 'immutable';
import _ from 'lodash/fp';

import { toJS, clearIn, subtractIn, pushIn, deleteIn, rejectIn, filterIn } from './index';

const NESTED_SET_FIXTURE = fromJS({
  nestedSet: new $$Set(['a', 'b', 'c']),
});

const NESTED_LIST_FIXTURE = fromJS({
  nestedList: ['a', 'b', 'c'],
});

describe('utils/immutable', () => {
  describe('{ toJS }', () => {
    it('does nothing if the object is not an Immutable', (): void => {
      const obj = { foo: 'bar' };
      const actual = toJS(obj);

      expect(actual).toBe(obj);
    });

    it('invokes `toJS` on the object if it is Immutable', (): void => {
      const plainObj = { foo: 'bar' };
      const immutableObj = new $$Map(plainObj);
      const actual = toJS(immutableObj);

      expect(actual).toEqual(plainObj);
    });
  });

  describe('{ clearIn }', () => {
    it('clears a $$Set nested in an immutable and returns the immutable', () => {
      const actual = clearIn(['nestedSet'], NESTED_SET_FIXTURE).toJS();
      const expected = { nestedSet: [] };

      expect(actual).toEqual(expected);
    });
  });

  describe('{ subtractIn }', () => {
    it('subtracts an item from a $$Set nested in an immutable and returns the immutable', () => {
      const actual = subtractIn(['nestedSet'], 'a', NESTED_SET_FIXTURE).toJS();
      const expected = { nestedSet: ['c', 'b'] };

      expect(actual).toEqual(expected);
    });

    it('subtracts many items from a $$Set nested in an immutable and returns the immutable', () => {
      const actual = subtractIn(['nestedSet'], ['a', 'b'], NESTED_SET_FIXTURE).toJS();
      const expected = { nestedSet: ['c'] };

      expect(actual).toEqual(expected);
    });
  });

  describe('{ pushIn }', () => {
    it('pushes an item to a $$List nested in an immutable and returns the immutable', () => {
      const actual = pushIn(['nestedList'], 'd', NESTED_LIST_FIXTURE).toJS();
      const expected = { nestedList: ['a', 'b', 'c', 'd'] };

      expect(actual).toEqual(expected);
    });
  });

  describe('{ deleteIn }', () => {
    it('deletes item at the given index inside a nested $$List and returns the immutable', () => {
      const actual = deleteIn(['nestedList'], 0, NESTED_LIST_FIXTURE).toJS();
      const expected = { nestedList: ['b', 'c'] };

      expect(actual).toEqual(expected);
    });
  });

  describe('{ rejectIn }', () => {
    it('removes items in nested $$List for which predicate returns true', () => {
      const actual = rejectIn(['nestedList'], _.isEqual('a'), NESTED_LIST_FIXTURE).toJS();
      const expected = { nestedList: ['b', 'c'] };

      expect(actual).toEqual(expected);
    });
  });

  describe('{ filterIn }', () => {
    it('removes items in nested $$List for which predicate returns false', () => {
      const actual = filterIn(['nestedList'], _.isEqual('a'), NESTED_LIST_FIXTURE).toJS();
      const expected = { nestedList: ['a'] };
      expect(actual).toEqual(expected);
    });
  });
});
