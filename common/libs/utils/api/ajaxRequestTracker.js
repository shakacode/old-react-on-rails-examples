// @flow
import { Set as $$Set } from 'immutable';
import _ from 'lodash/fp';

const ATTRIBUTE_NAME = 'data-are_ajax_requests_pending';

let pendingAjaxRequestUuids = new $$Set();

export default function createAjaxRequestTracker() {
  const uuid = _.uniqueId();
  const bodyEl = document.body;

  if (bodyEl == null) {
    throw new Error('document.body is undefined!');
  }

  const hasPendingAjaxRequests = () => !pendingAjaxRequestUuids.isEmpty();
  const updateBodyAttribute = () => bodyEl.setAttribute(ATTRIBUTE_NAME, hasPendingAjaxRequests().toString());

  return {
    start() {
      pendingAjaxRequestUuids = pendingAjaxRequestUuids.add(uuid);
      updateBodyAttribute();
    },

    end() {
      pendingAjaxRequestUuids = pendingAjaxRequestUuids.subtract(uuid);
      updateBodyAttribute();
    },
  };
}
