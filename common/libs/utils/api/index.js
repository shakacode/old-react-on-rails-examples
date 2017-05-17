// @flow
import { stringify } from 'qs';
import _ from 'lodash/fp';

import Environment from '../../constants/Environment';
import * as env from '../env';
import createAjaxRequestTracker from './ajaxRequestTracker';
import ApiError from './ApiError';

type strictQuery = {|
  page?: ?number,
|};

const IS_BROWSER = !(window.callApi === undefined);

function parseImmutableData(data: any) {
  return typeof data.toJS === 'function' ? data.toJS() : data;
}

function checkResponseStatus(response: Response) {
  if (response.ok) return response;

  return response.json().then(errData => {
    const isBadCsrfToken = response.status === 401 && errData.message === 'Bad Authenticity Token';
    if (isBadCsrfToken && IS_BROWSER) window.location.reload();
    const error = new ApiError(response.statusText, errData, response.status);
    throw error;
  });
}

function parseResponse(response: Response) {
  return response.status !== 204 ? response.json() : response;
}

export function buildUrl(path: string, query: strictQuery) {
  const filteredQuery = _.pickBy(_.identity, query);
  return `${path}?${stringify(filteredQuery, { arrayFormat: 'brackets' })}`;
}

export function getCsrfToken() {
  const isTest = env.get('RAILS_ENV') === Environment.TEST;
  if (isTest) return null;

  const metas = document.querySelectorAll('meta');
  const token = _.find({ name: 'csrf-token' }, metas);

  if (!token) throw new Error('Missing CSRF TOKEN in head');

  return token.content;
}

export function parseRawParams(method: MethodType, rawParams: string | Object) {
  return typeof rawParams === 'string' ? { method, url: rawParams } : Object.assign({}, { method }, rawParams);
}

function buildReqBody(data: any) {
  const reqBody = parseImmutableData(data);

  return _.isPlainObject(reqBody) ? JSON.stringify(reqBody) : reqBody;
}

export function buildReqUrl(params: Request) {
  return params.url;
}

export function buildReqParams(params: Request) {
  const reqParams = {};

  reqParams.method = params.method;

  if (params.data) {
    reqParams.body = buildReqBody(params.data);
  }

  if (!params.remote) {
    reqParams.credentials = 'same-origin';
    if (IS_BROWSER) {
      reqParams.headers = {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken(),
      };
    } else {
      reqParams.headers = {
        'Content-Type': 'application/json',
      };
    }
  } else if (params.remote && params.data && _.isPlainObject(parseImmutableData(params.data))) {
    reqParams.headers = {
      'Content-Type': 'application/json',
    };
  }

  return reqParams;
}

let callApiMutable;

if (IS_BROWSER) {
  callApiMutable = function (method: MethodType, rawParams: string | Object) {
    const parsedParams = parseRawParams(method, rawParams);

    const reqUrl = buildReqUrl(parsedParams);
    const reqParams = buildReqParams(parsedParams);

    const ajaxRequestTracker = createAjaxRequestTracker();

    ajaxRequestTracker.start();

    return fetch(reqUrl, reqParams)
      .then(res => {
        ajaxRequestTracker.end();
        return res;
      })
      .then(checkResponseStatus)
      .then(parseResponse)
      .catch(err => {
        ajaxRequestTracker.end();
        throw err;
      });
  };
} else {
  callApiMutable = function (method: MethodType, rawParams: string | Object) {
    const parsedParams = parseRawParams(method, rawParams);

    const reqUrl = buildReqUrl(parsedParams);
    const reqParams = buildReqParams(parsedParams);

    return fetch(reqUrl, reqParams)
      .then(res => res)
      .then(checkResponseStatus)
      .then(parseResponse)
      .catch(err => {
        throw err;
      });
  };
}

export const callApi = callApiMutable;
