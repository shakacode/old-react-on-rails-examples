const _ = require('lodash/fp');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { removeEmpty } = require('./utils');

const sassResources = [
  './app/assets/styles/bootstrap/pre-customizations.scss',
  './app/assets/styles/bootstrap/replicated-values.scss',
  './app/assets/styles/resources/variables.scss',
  './app/assets/styles/resources/mixins.scss',
  './app/assets/styles/resources/media.scss',
  './app/assets/styles/resources/z-indexes.scss',
  './app/assets/styles/resources/elements/common.scss',
  './app/assets/styles/resources/elements/forms.scss',
  './app/assets/styles/resources/elements/buttons.scss',
];

const basicStyleLoaders = () => [
  {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      },
      'postcss-loader',
    ],
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      },
      'postcss-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: { resources: sassResources },
      },
    ],
  },
];

const extractTextStyleLoaders = () => [
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          query: {
            minimize: true, // prevents weird comment errors
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
        'postcss-loader',
      ],
    }),
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          query: {
            minimize: true, // prevents weird comment errors
            modules: true,
            importLoaders: 2,
            localIdentName: '[name]__[local]__[hash:base64:5]',
          },
        },
        'postcss-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          query: { resources: sassResources },
        },
      ],
    }),
  },
];

const serverRenderingStyleLoaders = () => [
  {
    test: /\.css$/,
    use: {
      loader: 'css-loader/locals',
      options: {
        modules: true,
        importLoaders: 0,
        localIdentName: '[name]__[local]__[hash:base64:5]',
      },
    },
  },
  {
    test: /\.scss$/,
    use: [
      {
        loader: 'css-loader/locals',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        },
      },
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: { resources: sassResources },
      },
    ],
  },
];

function setModule(builderConfig, webpackConfig) {
  const webpackModule = {
    noParse: removeEmpty([/\.min\.js$/]),
    rules: removeEmpty([
      {
        test: /\.woff2?$/,
        use: {
          loader: 'url-loader',
          options: { limit: 10000 },
        },
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 10000 },
        },
      },
      {
        test: /\.(ttf|eot|svg)$/,
        use: 'file-loader',
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            query: 'jQuery',
          },
          {
            loader: 'expose-loader',
            query: '$',
          },
        ],
      },
      {
        test: /bootstrap-sass\/assets\/javascripts\//,
        use: {
          loader: 'imports-loader',
          options: { jQuery: 'jquery' },
        },
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      /* eslint-disable indent */
      builderConfig.developerAids
        ? {
            test: require.resolve('react-addons-perf'),
            use: {
              loader: 'expose-loader',
              query: 'Perf',
            },
          }
        : null,
      /* eslint-enable indent */
    ]),
  };

  if (builderConfig.extractText) {
    webpackModule.rules.push(...extractTextStyleLoaders());
  } else if (builderConfig.serverRendering) {
    webpackModule.rules.push(...serverRenderingStyleLoaders());
  } else {
    webpackModule.rules.push(...basicStyleLoaders());
  }

  return _.set('module', webpackModule, webpackConfig);
}

module.exports = _.curry(setModule);
