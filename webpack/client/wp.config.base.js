import { join, resolve } from 'path';
import webpack from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';

import { PATHS } from '../constants';

// Webpack base configuration
export default {

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

    // // alias
    // // TODO: eslint fix
    // alias: {
    //   Client: PATHS.CLIENT,
    //   Browser: PATHS.BROWSER,
    //   Common: PATHS.COMMON
    // },

    // extensions
    extensions: ['*', '.js', '.jsx', '.json']
  },

  entry: {
    // vendors
    vendors: [
      'react',
      'react-dom',
      'prop-types'
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
        loader: "eslint-loader",
      },
      // jsx
      {
        test: /\.jsx?$/,
        include: [PATHS.BROWSER, PATHS.CLIENT, PATHS.COMMON],
        exclude: [PATHS.NODE_MODULES],
        loaders: ['babel-loader']
      },
      // graph ql
      {
        test: /\.(gql|graphql)$/,
        include: [PATHS.BROWSER, PATHS.CLIENT, PATHS.COMMON],
        exclude: [PATHS.NODE_MODULES],
        loader: 'graphql-tag/loader',
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
