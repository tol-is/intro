const { resolve } = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const CommonConfig = require('./wp.config.base.js');

const { PATHS } = require('../constants');

// construct hot middleware script with custom port
const hotMiddlewareScript = `webpack-hot-middleware/client?path=http://127.0.0.1:${process.env.PORT_HOT}/__webpack_hmr&reload=true`;

// Global Variables for webpack DefinePlugin
const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('development')
  },
  __DEV__: true
};

module.exports = Merge(CommonConfig, {

  // dev tool
  devtool: 'eval',

  // entry point(s)
  entry: {
    // intro
    client: [
      'react-hot-loader/patch',
      hotMiddlewareScript,
      resolve(PATHS.BROWSER, 'index')
    ]
  },

  // Output
  output: {
    path: PATHS.PUBLIC,
    pathinfo: true,
    filename: 'client.js',
    chunkFilename: '[id]-[name].js',
    publicPath: process.env.STATIC_URL,
  },

  // Plugins
  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // define globals
    new webpack.DefinePlugin(GLOBALS),

    // don't emit on error
    new webpack.NoEmitOnErrorsPlugin(),

    // bundle analyzer
    new BundleAnalyzerPlugin({
      startAnalyzer: false,
      analyzerPort: 3333,
      openAnalyzer: true,
      generateStatsFile: false
    }),

    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.js' })

  ]

});
