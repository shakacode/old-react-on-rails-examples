const _ = require('lodash/fp');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { addOption, getEnvVar, removeEmpty } = require('./utils');

function setPlugins(builderConfig, webpackConfig) {
  const ifOptimize = option => addOption(builderConfig.optimize, option);
  const ifHmr = option => addOption(builderConfig.hmr, option);
  const ifExtractText = option => addOption(builderConfig.extractText, option);
  const ifChunk = option => addOption(builderConfig.chunk, option);

  const plugins = removeEmpty([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: getEnvVar('NODE_ENV'),
        RAILS_ENV: getEnvVar('RAILS_ENV'),
        SERVER_RENDERING: !!builderConfig.serverRendering,
        HONEYBADGER_API_KEY: getEnvVar('HONEYBADGER_API_KEY'),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: builderConfig.optimize,
      debug: false,
      options: {
        context: path.resolve(__dirname, '..'),

        // Workaround for `resolve-url-loader`:
        // https://github.com/bholloway/resolve-url-loader/issues/33#issuecomment-249830601
        output: {
          path: (
            builderConfig.hmr
            ? path.resolve(__dirname, '..', '..', 'public')
            : path.resolve(__dirname, '..', '..', 'app', 'assets', 'webpack')
          ),
        },

        babel: {
          cacheDirectory: '../tmp/babel-cache',
          plugins: removeEmpty([
            ifOptimize('babel-plugin-transform-react-remove-prop-types'),
            // ifDeveloperAids('typecheck'), // skipped until typecheck can be updated
            // ifDeveloperAids('babel-plugin-flow-react-proptypes'),
            ifHmr([
              'babel-plugin-react-transform',
              {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module'],
                  },
                ],
              },
            ]),
          ]),
        },
      },
    }),

    ifChunk(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: [
        'global-styles', // See ./set-entry.js
        'listings-index',
      ],
      filename: 'vendor-client-bundle.js',
      minChunks: Infinity,
    })),
    ifHmr(new webpack.HotModuleReplacementPlugin()),
    ifHmr(new webpack.NoEmitOnErrorsPlugin()),
    ifOptimize(new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: true,
      },
    })),
    ifExtractText(new ExtractTextPlugin({ filename: '[name]-client-bundle.css', allChunks: true })),
  ]);

  return _.set('plugins', plugins, webpackConfig);
}

module.exports = _.curry(setPlugins);
