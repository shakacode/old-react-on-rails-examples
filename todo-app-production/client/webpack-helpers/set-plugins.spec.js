const { assert } = require('chai');
const _ = require('lodash/fp');

const setPlugins = require('./set-plugins');

describe('webpack-helpers/set-plugins', () => {
  it('adds plugins', () => {
    const actual = setPlugins({}, {});

    assert.property(actual, 'plugins');
    assert.isAtLeast(actual.plugins.length, 0);
  });

  describe('optimize', () => {
    context('when builderConfig.optimize is true', () => {
      const builderConfig = { optimize: true };

      it('adds uglifyJS plugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        assert.isDefined(_.find(['constructor.name', 'UglifyJsPlugin'], actual));
      });
    });
  });

  describe('hmr', () => {
    context('when builderConfig.hmr is true', () => {
      const builderConfig = { hmr: true };

      it('adds HotModuleReplacementPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        assert.isDefined(_.find(['constructor.name', 'HotModuleReplacementPlugin'], actual));
      });

      it('adds NoEmitOnErrorsPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        assert.isDefined(_.find(['constructor.name', 'NoEmitOnErrorsPlugin'], actual));
      });
    });
  });

  describe('extractText', () => {
    context('when builderConfig.extractText is true', () => {
      const builderConfig = { extractText: true };

      it('adds ExtractTextPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        assert.isDefined(_.find(['constructor.name', 'ExtractTextPlugin'], actual));
      });
    });
  });

  describe('chunk', () => {
    context('when builderConfig.chunk is true', () => {
      const builderConfig = { chunk: true };

      it('uses CommonsChunkPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        assert.isDefined(_.find(['constructor.name', 'CommonsChunkPlugin'], actual));
      });
    });

    context('when builderConfig.chunk is falsy', () => {
      const builderConfig = { chunk: false };

      it('does not use CommonsChunkPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        assert.isUndefined(_.find(['constructor.name', 'CommonsChunkPlugin'], actual));
      });
    });
  });
});
