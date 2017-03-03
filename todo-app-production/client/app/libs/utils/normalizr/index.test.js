// @flow
import { normalizeMapIdKeys, normalizeArray, normalizeArrayToMap } from './index';

describe('libs/utils/normalizr', () => {
  describe('normalizeArray', () => {
    it('creates an object with numeric ids as the keys', () => {
      const array = [{ id: 1 }];

      const actual = normalizeArray(array);
      const expected = { [1]: { id: 1 } }; // eslint-disable-line no-useless-computed-key

      expect(actual).toEqual(expected);
    });
  });

  describe('normalizeArrayToMap', () => {
    it('creates a map with numeric ids as the keys', () => {
      const array = [{ id: 1 }];

      const actual = normalizeArrayToMap(array);
      const expected = normalizeMapIdKeys({ [1]: { id: 1 } }); // eslint-disable-line no-useless-computed-key,max-len

      expect(actual).toEqual(expected);
    });
  });
});
