const { assert } = require('chai');

const setOutput = require('./set-output');

describe('webpack-helpers/set-output', () => {
  describe('hmr', () => {
    context('when builderConfig.hmr is true', () => {
      const builderConfig = { hmr: true };

      it('outputs to a public path', () => {
        const expected = /http:\/\/lvh\.me:\d\d\d\d/;
        const actual = setOutput(builderConfig, {}).output.publicPath;

        assert.match(actual, expected);
      });
    });

    context('when builderConfig.hmr is false', () => {
      const builderConfig = { hmr: false };

      it('outputs to app/assets/webpack', () => {
        const expected = /app\/assets\/webpack$/;
        const actual = setOutput(builderConfig, {}).output.path;

        assert.match(actual, expected);
      });
    });
  });

  describe('developerAids', () => {
    context('when builderConfig.developerAids is true', () => {
      const builderConfig = { developerAids: true };

      it('outputs to app/assets/webpack', () => {
        const actual = setOutput(builderConfig, {}).output.pathinfo;

        assert.isTrue(actual);
      });
    });
  });

  describe('output', () => {
    context('when builderConfig.serverRendering is true', () => {
      const builderConfig = { serverRendering: true };

      it('sets filename to "server-bundle.js"', () => {
        const expected = 'server-bundle.js';
        const actual = setOutput(builderConfig, {}).output.filename;

        assert.equal(actual, expected);
      });
    });
  });
});
