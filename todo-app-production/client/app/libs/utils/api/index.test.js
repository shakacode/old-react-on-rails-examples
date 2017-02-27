import { buildUrl } from './index';

describe('libs/utils/api', () => {
  test('{ buildUrl }', () => {
    it('combines a path and an object of key values into a url with a query', () => {
      const path = 'example.com';
      const query = { page: 1 };
      const actual = buildUrl(path, query);
      const expected = 'example.com?page=1';

      expect(actual).toBe(expected);
    });

    it('removes keys that have null values', () => {
      const path = 'example.com';
      const query = { page: null };
      const actual = buildUrl(path, query);
      const expected = 'example.com?';

      expect(actual).toBe(expected);
    });
  });
});
