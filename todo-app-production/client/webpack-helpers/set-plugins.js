const _ = require('lodash/fp');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { addOption, getEnvVar, removeEmpty, getDllPath } = require('./utils');

function setPlugins(builderConfig, webpackConfig) {
  const ifDll = option => addOption(builderConfig.deps === 'dll', option);
  const ifChunk = option => addOption(builderConfig.deps === 'chunks', option);
  const ifOptimize = option => addOption(builderConfig.optimize, option);
  const ifExtractText = option => addOption(builderConfig.extractText, option);

  let dllManifest;
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    dllManifest = require(getDllPath('vendor.json'));
  } catch (error) {
    if (builderConfig.deps === 'dll') {
      throw new Error('DLL manifest is missing. Run `yarn run build:dll`');
    }
  }

  const plugins = removeEmpty([
    ifDll(
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, '..'),
        manifest: dllManifest,
      }),
    ),
    ifChunk(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['global-styles', 'todos-index'],
        filename: 'vendor-client-bundle.js',
        minChunks: Infinity,
      }),
    ),
    ifOptimize(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ),
    ifExtractText(new ExtractTextPlugin({ filename: '[name]-client-bundle.css', allChunks: true })),
    new webpack.LoaderOptionsPlugin({
      minimize: builderConfig.optimize,
      debug: false,
      options: {
        context: path.resolve(__dirname, '..'),
        output: {
          path: path.resolve(__dirname, '..', '..', 'app', 'assets', 'webpack'),
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: getEnvVar('NODE_ENV'),
        RAILS_ENV: getEnvVar('RAILS_ENV'),
      },
    }),
  ]);

  return _.set('plugins', plugins, webpackConfig);
}

module.exports = _.curry(setPlugins);
