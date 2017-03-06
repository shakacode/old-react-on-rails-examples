// @flow
import { Map as $$Map, OrderedSet as $$OrderedSet } from 'immutable';

import { normalizeTodo } from './index';

test('normalizeTodos', () => {
  const apiResponse = {
    id: 1,
    description: 'todo',
    completed: false,
    created_at: 'earlier',
    updated_at: 'also earlier',
  };
  const actual = normalizeTodo(apiResponse);
  const expected = {
    entities: {
      todos: $$Map({
        [1]: $$Map(apiResponse), // eslint-disable-line no-useless-computed-key
      }).mapKeys(id => parseInt(id, 10)),
    },
    result: $$OrderedSet([1]),
  };

  expect(actual).toEqual(expected);
});
