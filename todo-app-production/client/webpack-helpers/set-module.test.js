const _ = require('lodash/fp');

const setModule = require('./set-module');

describe('webpack-helpers/set-module', () => {
  it('adds loaders', () => {
    const actual = setModule({}, {});

    expect(actual.module.rules).toBeDefined();
  });

  describe('developerAids', () => {
    test('when builderConfig.developerAids is true', () => {
      const builderConfig = { developerAids: true };

      // Skipped until typecheck can be updated to be compatible (or if we just want to remove it)
      it.skip('adds "typecheck" query plugin to babel loader', () => {
        const result = setModule(builderConfig, {});
        const babelLoader = _.find({ loader: 'babel-loader' }, result.module.rules);

        expect(babelLoader.options.plugins).toBe(expect.StringContaining('typecheck'));
      });

      it('adds "react-addons-perf" loader', () => {
        const result = setModule(builderConfig, {});
        const actual = _.find(
          loader => /react-addons-perf/.test(loader.test),
          result.module.rules,
        );

        expect(actual).toBeDefined();
      });
    });
  });

  describe('extractText', () => {
    test('when builderConfig.extractText is true', () => {
      const builderConfig = { extractText: true };

      it('adds uses the extract text plugin for the css and sass loaders', () => {
        const cssLoader = _.find({ test: /\.css$/ }, setModule(builderConfig, {}).module.rules);
        const sassLoader = _.find({ test: /\.scss$/ }, setModule(builderConfig, {}).module.rules);

        expect(cssLoader.loader).toBe(expect.stringMatching(/extract-text-webpack-plugin/));
        expect(sassLoader.loader).toBe(expect.stringMatching(/extract-text-webpack-plugin/));
      });

      it('minimizes Sass and CSS', () => {
        const cssLoader = _.find({ test: /\.css$/ }, setModule(builderConfig, {}).module.rules);
        const sassLoader = _.find({ test: /\.scss$/ }, setModule(builderConfig, {}).module.rules);

        expect(cssLoader.loader).toBe(expect.stringMatching(/minimize/));
        expect(sassLoader.loader).toBe(expect.stringMatching(/minimize/));
      });
    });

    test('when builderConfig.extractText is false', () => {
      const builderConfig = { extractText: false };

      it('does not add the extract text plugin for the css and sass loaders', () => {
        const cssLoader = _.find({ test: /\.css$/ }, setModule(builderConfig, {}).module.rules);
        const sassLoader = _.find({ test: /\.scss$/ }, setModule(builderConfig, {}).module.rules);

        expect(cssLoader.loader).not.toBe(expect.stringMatching(/extract-text-webpack-plugin/));
        expect(sassLoader.loader).not.toBe(expect.stringMatching(/extract-text-webpack-plugin/));
      });
    });
  });
});
