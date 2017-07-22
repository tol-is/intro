const logger = require('minilog')('app');

// get config
const config = require("./config");

// init core
const { app, db } = require("./core")();

// init graph
const graph = require("./graph")(app, db);

// start listening
app.listen(config.port, ()=>{
  logger.info(`Tarmac running on : ${config.app_url}`)
});

// export
module.exports = app;
