// @flow
import { stringify } from 'qs';
import _ from 'lodash/fp';

import Environment from '../../constants/Environment';
import * as env from '../env';

type strictQuery = {|
  page?: ?number,
|};

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
