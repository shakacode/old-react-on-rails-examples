const { assert } = require('chai');

const setDevtool = require('./set-devtool');

describe('webpack-helpers/set-devtool', () => {
  context('when builderConfig.devtool is not defined', () => {
    it('outputs to a public path', () => {
      const actual = setDevtool({}, {}).devtool;

      assert.isUndefined(actual);
    });
  });

  context('when builderConfig.sourceMaps is set to "foo"', () => {
    const builderConfig = { sourceMaps: 'foo' };

    it('sets config\'s devtool to "foo"', () => {
      const expected = 'foo';
      const actual = setDevtool(builderConfig, {}).devtool;

      assert.equal(actual, expected);
    });
  });
});
