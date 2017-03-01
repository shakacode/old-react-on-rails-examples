// @flow
const setOutput = require('./set-output');

describe('webpack-helpers/set-output', () => {
  describe('hmr', () => {
    describe('when builderConfig.hmr is true', () => {
      const builderConfig = { hmr: true };

      it('outputs to a public path', () => {
        const expected = /http:\/\/lvh\.me:\d\d\d\d/;
        const actual = setOutput(builderConfig, {}).output.publicPath;

        expect(actual).toMatch(expected);
      });
    });

    describe('when builderConfig.hmr is false', () => {
      const builderConfig = { hmr: false };

      it('outputs to app/assets/webpack', () => {
        const expected = /app\/assets\/webpack$/;
        const actual = setOutput(builderConfig, {}).output.path;

        expect(actual).toMatch(expected);
      });
    });
  });

  describe('developerAids', () => {
    describe('when builderConfig.developerAids is true', () => {
      const builderConfig = { developerAids: true };

      it('outputs to app/assets/webpack', () => {
        const actual = setOutput(builderConfig, {}).output.pathinfo;

        expect(actual).toBe(true);
      });
    });
  });

  describe('output', () => {
    describe('when builderConfig.serverRendering is true', () => {
      const builderConfig = { serverRendering: true };

      it('sets filename to "server-bundle.js"', () => {
        const expected = 'server-bundle.js';
        const actual = setOutput(builderConfig, {}).output.filename;

        expect(actual).toBe(expected);
      });
    });
  });
});
