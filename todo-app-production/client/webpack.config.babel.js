const _ = require('lodash/fp');
const builder = require('./webpack-helpers/builder');

/*
 * builder config options:
 *
 * chunk: ?boolean - whether to chunk into multiple bundles or just output one
 * developerAids: ?boolean - things like babel type check, react perf tools, pathinfo, etc.
 * extractText: ?boolean - extract styles out of JS and into bundle CSS files
 * hmr: ?boolean - hot module reloading
 * optimize: ?boolean - performance optimizations like uglify, minimize, etc.
 * serverRendering: ?boolean - whether you are server rendering (different entry, env vars)
 * sourceMaps: ?string - webpack's 'devtool' setting, renamed for clarity
 */
const BUILDER_CONFIGS = {
  dev: {
    chunk: true,
    developerAids: true,
    hmr: true,
    sourceMaps: 'eval',
  },

  serverBundleDev: {
    developerAids: true,
    serverRendering: true,
    sourceMaps: 'eval',
  },

  prod: {
    chunk: true,
    extractText: true,
    optimize: true,
    sourceMaps: 'source-map',
  },

  serverBundleProd: {
    optimize: true,
    serverRendering: true,
    sourceMaps: 'source-map',
  },

  rspec: {
    chunk: true,
    developerAids: true,
    extractText: true,
    sourceMaps: 'inline-source-map',
  },

  serverBundleRspec: {
    developerAids: true,
    serverRendering: true,
    sourceMaps: 'eval',
  },
};

// envs come in like: { prod: true }
module.exports = env => {
  const envKey = _.keys(env)[0] || 'prod';
  const builderConfig = BUILDER_CONFIGS[envKey];
  // NOTE: `eslint-import-resolver-webpack` rethrows this as it doesn't pass any `env`
  // if (!builderConfig) throw new Error(`Webpack config received unknown env key: ${envKey}`);

  return builder(builderConfig);
};
