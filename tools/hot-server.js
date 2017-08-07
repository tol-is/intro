/* eslint-disable no-console */

import webpack from 'webpack';
import webpackDev from 'webpack-dev-middleware';
import webpackHot from 'webpack-hot-middleware';
import express from 'express';

import webpackConfig from '../webpack/client/wp.config.dev';

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDev(compiler, {
  publicPath: webpackConfig.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  noInfo      : false,
  hot         : true,
  quiet       : false,
  stats       : {
    colors       : true,
    children     : false,
    version      : false,
    hash         : false,
    timings      : true,
    chunks       : false,
    chunkModules : false,
    modules      : false,
    performance  : true,
    errors       : true,
    publicPath   : true,
    errorDetails : true,
    warnings     : false
  }
}));

app.use(webpackHot(compiler, {
  log: console.log,
  heartbeat: 10 * 1000,
  path: '/__webpack_hmr'
}));

app.listen(process.env.PORT_HOT);
