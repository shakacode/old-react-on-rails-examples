const _ = require('lodash/fp');

const setPlugins = require('./set-plugins');

describe('webpack-helpers/set-plugins', () => {
  it('adds plugins', () => {
    const actual = setPlugins({}, {});

    expect(actual.plugins).toBeDefined();
    expect(actual.plugins.length).toBeGreaterThanOrEqual(0);
  });

  describe('optimize', () => {
    test('when builderConfig.optimize is true', () => {
      const builderConfig = { optimize: true };

      it('adds uglifyJS plugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'UglifyJsPlugin'], actual)).toBeDefined();
      });
    });
  });

  describe('hmr', () => {
    test('when builderConfig.hmr is true', () => {
      const builderConfig = { hmr: true };

      it('adds HotModuleReplacementPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'HotModuleReplacementPlugin'], actual)).toBeDefined();
      });

      it('adds NoEmitOnErrorsPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'NoEmitOnErrorsPlugin'], actual)).toBeDefined();
      });
    });
  });

  describe('extractText', () => {
    test('when builderConfig.extractText is true', () => {
      const builderConfig = { extractText: true };

      it('adds ExtractTextPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'ExtractTextPlugin'], actual)).toBeDefined();
      });
    });
  });

  describe('chunk', () => {
    test('when builderConfig.chunk is true', () => {
      const builderConfig = { chunk: true };

      it('uses CommonsChunkPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'CommonsChunkPlugin'], actual)).toBeDefined();
      });
    });

    test('when builderConfig.chunk is falsy', () => {
      const builderConfig = { chunk: false };

      it('does not use CommonsChunkPlugin', () => {
        const actual = setPlugins(builderConfig, {}).plugins;

        expect(_.find(['constructor.name', 'CommonsChunkPlugin'], actual)).toBeDefined();
      });
    });
  });
});
