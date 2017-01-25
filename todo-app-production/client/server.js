/* eslint-disable no-console */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server'); // eslint-disable-line import/no-extraneous-dependencies
const createConfig = require('./webpack.config.babel');

const webpackConfig = createConfig({ dev: true });

const hotRailsPort = process.env.HOT_RAILS_PORT || 3500;

const compiler = webpack(webpackConfig);

const devServer = new WebpackDevServer(compiler, {
  proxy: { '*': `http://lvh.me:${hotRailsPort}` },
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
});

devServer.listen(hotRailsPort, '0.0.0.0', err => {
  if (err) console.error(err);
  console.log(
    `=> 🔥  Webpack development server is running on port ${hotRailsPort}`,
  );
});

compiler.plugin('done', () => {
  process.stdout.write('Webpack: Done!');
});
