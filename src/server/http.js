const logger = require('minilog')('app');

const { createServer } = require('http');

const {
  port,
  app_url
} = require('./config');

module.exports = (app) => {

  server = createServer( function(req,res){
    res.writeHead(404)
    res.end()
  } )

  // start listening
  app.listen(port, ()=>{
    logger.info(`Tarmac running on : ${app_url}`)
  });

  return server;
}
