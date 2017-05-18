const fs = require('fs');

const builder = require('./webpack-helpers/builder');
const { getDllPath } = require('./webpack-helpers/utils');

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
    deps: 'dll',
    developerAids: true,
    extractText: true,
    sourceMaps: 'eval',
  },

  serverBundleDev: {
    developerAids: true,
    serverRendering: true,
    sourceMaps: 'eval',
  },

  prod: {
    deps: 'chunks',
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
    deps: 'chunks',
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

module.exports = (env = 'prod') => {
  const builderConfig = BUILDER_CONFIGS[env];

  if (builderConfig.deps === 'dll' && !fs.existsSync(getDllPath('vendor.json'))) {
    throw new Error('DLL manifest is missing. Run `yarn run build:dll`');
  }

  return builder(builderConfig);
};
