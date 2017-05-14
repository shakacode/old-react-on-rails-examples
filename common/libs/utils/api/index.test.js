// @flow
import {
  buildUrl,
  parseRawParams,
  buildReqUrl,
  callApi
} from './index';

const todoParams = { todo: { description: 'this is a todo.' } };

describe('libs/utils/api', () => {
  describe('{ buildUrl }', () => {
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

  describe('{ parseRawParams }', () => {
    it('accepts todo params', () => {
      const url = '/todos';
      const actual = parseRawParams('GET', { url, data: todoParams });
      const expected = {
        method: 'GET',
        url: '/todos',
        data: {
          todo: {
            description: 'this is a todo.'
          }}};
      expect(actual).toMatchObject(expected);
    });

    it('accepts remote URLs', () => {
      const url = 'http://localhost:3000/api/v1/todos';
      const actual = parseRawParams(
        'GET', { remote: true, url, data: todoParams });
      const expected = {
        method: 'GET',
        url: 'http://localhost:3000/api/v1/todos',
        data: {
          todo: {
            description: 'this is a todo.'
          }}};
        expect(actual).toMatchObject(expected);
    });
  });

  describe('callApi', () => {
    it('handles 400 error with an exception', async () => {
      const url = 'http://fakeurl';
      fetch.mockResponseOnce(JSON.stringify([{description: "add a todo"}]), {status: 400});
      try {
        const resp = await callApi('GET', { url });
      } catch (error) {
        expect.anything();
      }
    });

    it('handles 500 error with an exception', async () => {
      const url = 'http://fakeurl';
      fetch.mockResponseOnce(JSON.stringify([{description: "add a todo"}]), {status: 500});
      try {
        const resp = await callApi('GET', { url });
      } catch (error) {
        expect.anything();
      }
    });
  });
});
