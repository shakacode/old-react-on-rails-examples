const _ = require('lodash/fp');

const { getPort } = require('./utils');

function setEntry(builderConfig, webpackConfig) {
  if (!builderConfig.chunk) {
    return _.set('entry', './server-rendering-entry.js', webpackConfig);
  }

  const entryLoc = loc => // eslint-disable-line no-confusing-arrow
    builderConfig.hmr
      ? [`webpack-dev-server/client?http://lvh.me:${getPort()}`, 'webpack/hot/only-dev-server', loc]
      : [loc];

  const entry = {
    'global-styles': entryLoc('./app/assets/styles/globals/base.js'),
    'todos-index': entryLoc('./app/bundles/todosIndex/startup/registration.js'),
    vendor: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'classnames',
      'es5-shim',
      'immutable',
      'isomorphic-fetch',
      'lodash',
      'lodash/fp',
      'normalizr',
      'react',
      'react-dom',
      'react-on-rails',
      'react-redux',
      'recompose',
      'redux',
      'reselect',
    ],
  };

  if (builderConfig.extractText) {
    entry.vendor.push('bootstrap-loader/extractStyles');
  } else {
    entry.vendor.push('bootstrap-loader');
  }

  if (builderConfig.developerAids) {
    entry.vendor.push('react-addons-perf');
  }

  return _.set('entry', entry, webpackConfig);
}

module.exports = _.curry(setEntry);
