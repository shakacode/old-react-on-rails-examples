const _ = require('lodash/fp');

const { getPort } = require('./utils');

function setEntry(builderConfig, webpackConfig) {
  if (!builderConfig.chunk) {
    return _.set('entry', './server-rendering-entry.js', webpackConfig);
  }

  const entryLoc = loc => (
    builderConfig.hmr
      ? [`webpack-dev-server/client?http://lvh.me:${getPort()}`, 'webpack/hot/only-dev-server', loc]
      : [loc]
  );

  const entry = {
    'global-styles': entryLoc('./app/assets/styles/globals/base.js'),
    'hello-world': entryLoc('./app/bundles/HelloWorld/startup/registration'),
    vendor: [
      'babel-polyfill',
      'classnames',
      'es5-shim',
      'honeybadger-js',
      'immutable',
      'isomorphic-fetch',
      'lodash',
      'lodash/fp',
      'normalizr',
      'react',
      'react-addons-pure-render-mixin',
      'react-addons-shallow-compare',
      'react-addons-update',
      'react-bootstrap',
      'react-dom',
      'react-on-rails',
      'react-redux',
      'recompose',
      'redux',
      'reselect'
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
