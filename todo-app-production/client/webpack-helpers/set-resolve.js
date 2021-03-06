const _ = require('lodash/fp');
const path = require('path');

function setResolve(_builderConfig, webpackConfig) {
  const resolve = {
    modules: [path.resolve(__dirname, '..', 'app'), 'node_modules'],
    alias: {
      api: path.resolve(__dirname, '..', 'app', 'api'),
      app: path.resolve(__dirname, '..', 'app'),
      todosIndex: path.resolve(__dirname, '..', 'app', 'bundles', 'todosIndex'),
    },
    extensions: ['.js', '.jsx', '.json'],
  };

  return _.set('resolve', resolve, webpackConfig);
}

module.exports = _.curry(setResolve);
