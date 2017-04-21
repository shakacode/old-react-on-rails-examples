// @flow
import * as apiUtils from '../api';

export default {
  get(params: string | Object) {
    return apiUtils.callApi('GET', params);
  },

  post(params: string | Object) {
    return apiUtils.callApi('POST', params);
  },

  patch(params: string | Object) {
    return apiUtils.callApi('PATCH', params);
  },

  put(params: string | Object) {
    return apiUtils.callApi('PUT', params);
  },

  delete(params: string | Object) {
    return apiUtils.callApi('DELETE', params);
  },
};
