// @flow
import { OrderedSet as $$OrderedSet } from 'immutable';

import { normalizeArrayToMap } from 'app/libs/utils/normalizr';

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
      todos: normalizeArrayToMap([apiResponse]),
    },
    result: $$OrderedSet([1]),
  };

  expect(actual).toEqual(expected);
});
