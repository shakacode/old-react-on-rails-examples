const _ = require('lodash/fp');

const MAX_ENTRY_POINT_SIZE = 15000000;

function setPerformance(builderConfig, webpackConfig) {
  if (builderConfig.optimize && !builderConfig.serverRendering) {
    return _.set('performance', {
      hints: 'error',
      maxAssetSize: 2000000,
      maxEntrypointSize: MAX_ENTRY_POINT_SIZE,
    }, webpackConfig);
  }

  return _.set('performance', {
    hints: 'warning',
    maxAssetSize: 99999999,
    maxEntrypointSize: MAX_ENTRY_POINT_SIZE,
  }, webpackConfig);
}

module.exports = _.curry(setPerformance);
