// @flow
const setDevtool = require('./set-devtool');

describe('webpack-helpers/set-devtool', () => {
  describe('when builderConfig.devtool is not defined', () => {
    it('outputs to a public path', () => {
      const actual = setDevtool({}, {}).devtool;

      expect(actual).toBeUndefined();
    });
  });

  describe('when builderConfig.sourceMaps is set to "foo"', () => {
    const builderConfig = { sourceMaps: 'foo' };

    it('sets config\'s devtool to "foo"', () => {
      const actual = setDevtool(builderConfig, {}).devtool;
      const expected = 'foo';

      expect(actual).toBe(expected);
    });
  });
});
