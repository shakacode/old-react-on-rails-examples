const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { vendor, dllExceptions } = require('./webpack-helpers/vendor');
const { getDllPath } = require('./webpack-helpers/utils');

module.exports = {
  entry: {
    vendor: vendor.filter(lib => !dllExceptions.includes(lib)),
  },
  output: {
    filename: '[name]-client-bundle.js',
    path: getDllPath(),
    library: '[name]',
  },
  devtool: 'eval',
  context: __dirname,
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: getDllPath('[name].json'),
    }),
    new ExtractTextPlugin({
      filename: '[name]-client-bundle.css',
      allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.woff2?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 10000 },
        },
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: 'file-loader',
      },
    ],
  },
};
