// @flow
const _ = require('lodash/fp');

const setPlugins = require('./set-plugins');

describe('webpack-helpers/set-plugins', () => {
  it('adds plugins', () => {
    const actual = setPlugins({}, {});

    expect(actual.plugins).toBeDefined();
    expect(actual.plugins.length).toBeGreaterThanOrEqual(0);
  });

  describe('optimize', () => {
    describe('when builderConfig.optimize is true', () => {
      const builderConfig = { optimize: true };

      it('adds uglifyJS plugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'UglifyJsPlugin'], actual)).toBeDefined();
      });
    });
  });

  describe('extractText', () => {
    describe('when builderConfig.extractText is true', () => {
      const builderConfig = { extractText: true };

      it('adds ExtractTextPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'ExtractTextPlugin'], actual)).toBeDefined();
      });
    });
  });

  describe('chunk', () => {
    describe('when builderConfig.chunk is true', () => {
      const builderConfig = { deps: 'chunks' };

      it('uses CommonsChunkPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'CommonsChunkPlugin'], actual)).toBeDefined();
      });
    });

    describe('when builderConfig.chunk is falsy', () => {
      const builderConfig = {};

      it('does not use CommonsChunkPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'CommonsChunkPlugin'], actual)).toBeUndefined();
      });
    });
  });
});
