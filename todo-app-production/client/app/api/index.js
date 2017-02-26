// @flow
import ReactOnRails from 'react-on-rails';

import * as httpVerbs from 'app/libs/constants/httpVerbs';
import type { FSA } from 'app/libs/types';

import routes from './routes';

const get = (url: string) => {
  const init = {
    method: httpVerbs.GET,
    redirect: 'manual',
  };
  return fetch(url, init);
};

/**
 * Submit new entity to server using Fetch API.
 *
 * @param {string} method - HTTP method to use.
 * @param {string} endpoint - url to request from.
 * @param {Object|number} entity - Request body to post.
 * @returns {Promise} - Result of ajax call.
 */
const submitEntity = (method: MethodType, endpoint: string, entity: any) => {
  const init = {
    method,
    headers: ReactOnRails.authenticityHeaders(),
    redirect: 'manual',
    body: JSON.stringify(entity),
  };
  return fetch(endpoint, init);
};

export const callApi = ({ type, payload }: FSA) => {
  const route = routes[type];
  switch (route.method) {
    case httpVerbs.GET:
      return payload ? get(`${route.endpoint}${payload}`) : get(route.endpoint);
    case httpVerbs.POST:
      return submitEntity('POST', route.endpoint, payload);
    case httpVerbs.PUT:
      return submitEntity(route.method, `${route.endpoint}${payload.id}`, payload);
    case httpVerbs.DELETE:
      return submitEntity(route.method, `${route.endpoint}${payload}`);
    default:
      throw new Error(`unexpected action type recieved: ${type}`);
  }
};
