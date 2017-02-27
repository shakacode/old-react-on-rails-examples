import _ from 'lodash/fp';
import { Set as $$Set } from 'immutable';

const ATTRIBUTE_NAME = 'data-are_ajax_requests_pending';

let $$pendingAjaxRequestUuids = new $$Set();

export default function createAjaxRequestTracker() {
  const uuid = _.uniqueId();
  const bodyEl = document.body;

  const hasPendingAjaxRequests = () => !$$pendingAjaxRequestUuids.isEmpty();
  const updateBodyAttribute = () => bodyEl.setAttribute(ATTRIBUTE_NAME, hasPendingAjaxRequests());

  return {
    start() {
      $$pendingAjaxRequestUuids = $$pendingAjaxRequestUuids.add(uuid);
      updateBodyAttribute();
    },

    end() {
      $$pendingAjaxRequestUuids = $$pendingAjaxRequestUuids.subtract(uuid);
      updateBodyAttribute();
    },
  };
}
