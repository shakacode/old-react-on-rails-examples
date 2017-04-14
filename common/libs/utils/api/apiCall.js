// @flow
import _ from 'lodash/fp';

import * as apiUtils from '../api';
import { apiRoutes } from '../../routes/api';

import createAjaxRequestTracker from './ajaxRequestTracker';
import ApiError from './ApiError';

export default {
  get(params: string | Object) {
    return this.callApi('GET', params);
  },

  post(params: string | Object) {
    return this.callApi('POST', params);
  },

  patch(params: string | Object) {
    return this.callApi('PATCH', params);
  },

  put(params: string | Object) {
    return this.callApi('PUT', params);
  },

  delete(params: string | Object) {
    return this.callApi('DELETE', params);
  },

  callApi(method: MethodType, rawParams: string | Object) {
    const parsedParams = this.parseRawParams(method, rawParams);

    const reqUrl = this.buildReqUrl(parsedParams);
    const reqParams = this.buildReqParams(parsedParams);

    const ajaxRequestTracker = createAjaxRequestTracker();

    ajaxRequestTracker.start();

    return fetch(reqUrl, reqParams)
      .then(res => {
        ajaxRequestTracker.end();
        return res;
      })
      .then(this.checkResponseStatus)
      .then(this.parseResponse)
      .catch(err => {
        ajaxRequestTracker.end();
        throw err;
      });
  },

  parseRawParams(method: MethodType, rawParams: string | Object) {
    return typeof rawParams === 'string' ? { method, url: rawParams } : Object.assign({}, { method }, rawParams);
  },

  buildReqUrl(params: Request) {
    return params.remote ? params.url : apiRoutes.apiScope(params.url);
  },

  buildReqParams(params: Request) {
    const reqParams = {};

    reqParams.method = params.method;

    if (params.data) {
      reqParams.body = this.buildReqBody(params.data);
    }

    if (!params.remote) {
      reqParams.credentials = 'same-origin';
      reqParams.headers = {
        'Content-Type': 'application/json',
        'X-CSRF-Token': apiUtils.getCsrfToken(),
      };
    } else if (params.remote && params.data && _.isPlainObject(this.parseImmutableData(params.data))) {
      reqParams.headers = {
        'Content-Type': 'application/json',
      };
    }

    return reqParams;
  },

  buildReqBody(data: any) {
    const reqBody = this.parseImmutableData(data);

    return _.isPlainObject(reqBody) ? JSON.stringify(reqBody) : reqBody;
  },

  parseImmutableData(data: any) {
    return typeof data.toJS === 'function' ? data.toJS() : data;
  },

  checkResponseStatus(response: Response) {
    if (response.ok) return response;

    return response.json().then(errData => {
      const isBadCsrfToken = response.status === 401 && errData.message === 'Bad Authenticity Token';
      if (isBadCsrfToken) window.location.reload();
      const error = new ApiError(response.statusText, errData, response.status);
      throw error;
    });
  },

  parseResponse(response: Response) {
    return response.status !== 204 ? response.json() : response;
  },
};
