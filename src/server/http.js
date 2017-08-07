const logger = require('minilog')('app');

const { createServer } = require('http');

const {
  port,
  app_url
} = require('./config');

module.exports = (app) => {

  server = createServer(app);

  // start listening
  server.listen(port, ()=>{
    logger.info(`Intro running on : ${app_url}`)
  });

  return server;
}
