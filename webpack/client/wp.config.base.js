const { join, resolve } = require('path');
const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const { PATHS } = require('../constants');

// Webpack base configuration
module.exports = {

  // Target
  target: 'web',

  // Dev Tool
  devtool: 'source-map',

  // Resolve
  resolve: {

    // modules directories
    modules: [
      PATHS.BROWSER,
      PATHS.CLIENT,
      PATHS.COMMON,
      PATHS.NODE_MODULES,
      PATHS.WEBPACK,
    ],

    // alias
    alias: {
      Browser: PATHS.BROWSER,
      Client: PATHS.CLIENT,
      Common: PATHS.COMMON,
      Fixtures: PATHS.FIXTURES
    },

    // extensions
    extensions: ['*', '.js', '.jsx', '.json']
  },

  entry: {
    // vendors
     vendors: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'redux-form',
      'prop-types',
      'apollo-client',
      'emotion'
    ]
  },

  // Loaders & Rules
  module: {
    rules: [
      // eslint
      {
        enforce: "pre",
        test: /\.jsx?$/,
        include: [PATHS.BROWSER, PATHS.CLIENT, PATHS.COMMON],
        exclude: [PATHS.NODE_MODULES],
        loader: "eslint-loader"
      },
      // jsx
      {
        test: /\.jsx?$/,
        include: [PATHS.BROWSER, PATHS.CLIENT, PATHS.COMMON, PATHS.WEBPACK],
        exclude: [PATHS.NODE_MODULES],
        loaders: ['babel-loader']
      },
      // graph ql
      {
        test: /\.(gql|graphql)$/,
        include: [PATHS.BROWSER, PATHS.CLIENT, PATHS.COMMON],
        exclude: [PATHS.NODE_MODULES],
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.svg$/,
        include: [PATHS.FIXTURES, PATHS.NODE_MODULES],
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'stage-2'],
              plugins: ['transform-object-rest-spread']
            }
          },
          {
            loader: 'svg-sprite-loader',
            options: {
              runtimeGenerator: require.resolve('./lib/sprite-loader/runtime-generator'),
              runtimeOptions: {
                iconModule: require.resolve('./lib/sprite-loader/icon.jsx')
              }
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                {removeDoctype: true},
                {collapseGroups: true},
                {removeMetadata: true},
                {removeTitle: true},
                {convertColors: {shorthex: false}},
                {convertPathData: false}
              ]
            }
          }
        ]
      }
    ]
  },

  // Plugins
  plugins: [
    // undersore to lodash replacement
    new webpack.NormalModuleReplacementPlugin(/underscore/, 'lodash'),

    // moment context replacement
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

    // scope hoisting for faster execution
    new webpack.optimize.ModuleConcatenationPlugin(),

    // async commons chunk
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2,
    })

  ]
};
