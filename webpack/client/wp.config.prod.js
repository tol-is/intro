import { resolve } from 'path';
import webpack from 'webpack';
import WebpackMd5Hash from 'webpack-md5-hash';
import Merge from 'webpack-merge';

import BaseConfig from './wp.config.base.js';

import { PATHS } from '../constants';

// Global Variables for webpack DefinePlugin
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default Merge(BaseConfig, {

  // dev tool
  devtool: 'source-map',

  // entry point(s)
  entry: {
    // tarmac
    tarmac: [
      resolve(PATHS.BROWSER, 'index')
    ]
  },

  output: {
    path: PATHS.PUBLIC,
    pathinfo: true,
    filename: 't-[chunkhash].js',
    chunkFilename: '[id]-[chunkhash].js',
    publicPath: process.env.STATIC_URL,
  },

  // Plugins
  plugins: [
  // globals
    new webpack.DefinePlugin(GLOBALS),

    // loader options
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    // uglify
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),

    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors', filename: 'v-[chunkhash].js' }),

    new WebpackMd5Hash(),

    new WebpackAssetsManifest({
      output: resolve(PATHS.COMMON, 'statics-manifest.json'),
      replacer: null,
      space: 2,
      writeToDisk: true,
      sortManifest: true,
      merge: true
    })
  ]

});
