/* eslint-disable no-console */

import webpack from 'webpack';
import webpackConfig from '../webpack/client/wp.config.prod';

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

webpack(webpackConfig).run((error, stats) => {
  if (error) {
    console.log(error);
    return 1;
  }

  const strstats = stats.toString({
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

  });

  console.log(strstats);

  // if we got this far, the build succeeded.
  console.log('Your app is compiled in production mode in /public. It\'s ready to roll!');

  return 0;
});
