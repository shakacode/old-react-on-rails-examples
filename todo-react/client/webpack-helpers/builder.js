const _ = require('lodash/fp');

const setEntry = require('./set-entry');
const setOutput = require('./set-output');
const setContext = require('./set-context');
const setDevtool = require('./set-devtool');
const setModule = require('./set-module');
const setPerformance = require('./set-performance');
const setPlugins = require('./set-plugins');
const setResolve = require('./set-resolve');
const setExternals = require('./set-externals');

module.exports = (builderConfig) => _.flow(
  setEntry(builderConfig),
  setOutput(builderConfig),
  setContext(builderConfig),
  setDevtool(builderConfig),
  setModule(builderConfig),
  setPerformance(builderConfig),
  setPlugins(builderConfig),
  setResolve(builderConfig),
  setExternals(builderConfig),
)({});
