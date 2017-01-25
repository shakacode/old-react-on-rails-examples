const _ = require('lodash/fp');

function setExternals(_builderConfig, webpackConfig) {
  return webpackConfig;
}

module.exports = _.curry(setExternals);
