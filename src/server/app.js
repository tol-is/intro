const logger = require('minilog')('app');

// get config
const config = require("./config");

// init core
const { app, db } = require("./core")();

// start listening
app.listen(config.port, ()=>{
  logger.info(`Tarmac running on : ${config.app_url}`)
});

// export
module.exports = app;
