import { isObject } from 'app/libs/utils';
import * as apiUtils from 'app/libs/utils/api';
import { apiRoutes } from 'app/libs/routes/api';

import createAjaxRequestTracker from './ajaxRequestTracker';

export default {
  get(params) {
    return this.callApi('GET', params);
  },

  post(params) {
    return this.callApi('POST', params);
  },

  patch(params) {
    return this.callApi('PATCH', params);
  },

  put(params) {
    return this.callApi('PUT', params);
  },

  delete(params) {
    return this.callApi('DELETE', params);
  },

  callApi(method, rawParams) {
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

  parseRawParams(method, rawParams) {
    return typeof rawParams === 'string' ? { method, url: rawParams } : Object.assign({}, { method }, rawParams);
  },

  buildReqUrl(params) {
    return params.remote ? params.url : apiRoutes.apiScope(params.url);
  },

  buildReqParams(params) {
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
    } else if (params.remote && params.data && isObject(this.parseImmutableData(params.data))) {
      reqParams.headers = {
        'Content-Type': 'application/json',
      };
    }

    return reqParams;
  },

  buildReqBody(data) {
    const reqBody = this.parseImmutableData(data);

    return isObject(reqBody) ? JSON.stringify(reqBody) : reqBody;
  },

  parseImmutableData(data) {
    return typeof data.toJS === 'function' ? data.toJS() : data;
  },

  checkResponseStatus(response) {
    if (response.ok) return response;

    return response.json().then(errData => {
      const isBadCsrfToken = response.status === 401 && response.message === 'FnG: Bad Authenticity Token';
      if (isBadCsrfToken) window.location.reload();
      const error = new Error(response.statusText);
      error.isApiError = true;
      error.response = {
        body: errData,
        status: response.status,
      };
      throw error;
    });
  },

  parseResponse(response) {
    return response.status !== 204 ? response.json() : response;
  },
};
