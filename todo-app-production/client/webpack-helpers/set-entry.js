const _ = require('lodash/fp');

const { vendor, dllExceptions } = require('./vendor');

function setEntry(builderConfig, webpackConfig) {
  const withDllExceptions = bundle => builderConfig.deps === 'dll' ? dllExceptions.concat(bundle) : bundle;

  const entry = {
    'global-styles': entryLoc('./app/assets/styles/globals/base.js'),
    'todos-index': entryLoc('./app/bundles/todosIndex/startup/App.jsx'),
  };

  if (builderConfig.deps === 'chunks') {
    entry.vendor = vendor;
  }

  return _.set('entry', entry, webpackConfig);
}

module.exports = _.curry(setEntry);
