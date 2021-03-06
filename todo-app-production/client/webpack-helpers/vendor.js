module.exports.vendor = [
  // polyfills
  'babel-polyfill',
  'es5-shim',
  'isomorphic-fetch',

  // libs
  'bootstrap-loader/extractStyles',
  'classnames',
  'immutable',
  'jquery',
  'jquery-ujs',
  'lodash',
  'lodash/fp',
  'normalizr',
  'qs',
  'react',
  'react-dom',
  'react-on-rails',
  'react-redux',
  'react-router',
  'recompose',
  'redux',
  'redux-saga',
  'reselect',
];

module.exports.dllExceptions = ['babel-polyfill'];

module.exports.devtools = [
  'redux-devtools',
  'redux-devtools-chart-monitor',
  'redux-devtools-diff-monitor',
  'redux-devtools-dock-monitor',
  'redux-logger',
];
