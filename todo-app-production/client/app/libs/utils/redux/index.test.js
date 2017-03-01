// @flow
import { buildActionType } from './index';

describe('utils/redux', () => {
  describe('buildActionType', () => {
    it('creates an action type string', () => {
      const namespace = 'todos';
      const actionName = 'createSucceeded';

      const actual = buildActionType(namespace, actionName);
      const expected = 'TODOS__CREATE_SUCCEEDED';

      expect(actual).toBe(expected);
    });
  });
});
