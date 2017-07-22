var logger = require('minilog')('app');

let config = require("./config");

let app = require("./core")();

// start listening
app.listen(config.port, ()=>{
  logger.info(`Tarmac running on : ${config.app_url}`)
});

exports = module.exports = app;
