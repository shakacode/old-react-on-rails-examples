const _ = require('lodash/fp');
const path = require('path');

const { getPort } = require('./utils');

const hmrOutput = () => ({
  filename: '[name]-client-bundle.js',
  path: path.resolve(__dirname, '..', '..', 'public'),
  publicPath: `http://lvh.me:${getPort()}/`,
});

const serverBundleOutput = () => ({
  filename: 'server-bundle.js',
  path: path.resolve(__dirname, '..', '..', 'app', 'assets', 'webpack'),
});

const normalOutput = () => ({
  filename: '[name]-client-bundle.js',
  path: path.resolve(__dirname, '..', '..', 'app', 'assets', 'webpack'),
});

function setOutput(builderConfig, webpackConfig) {
  const output = _.cond([
    [_.get('hmr'), hmrOutput],
    [_.get('serverRendering'), serverBundleOutput],
    [_.constant(true), normalOutput],
  ])(builderConfig);

  if (builderConfig.developerAids) output.pathinfo = true;

  return _.set('output', output, webpackConfig);
}

module.exports = _.curry(setOutput);
