var logger = require('minilog')('app');

// get config
let config = require("./config");

// init core
let { app, db } = require("./core")();

// init graph
let graph = require("./graph")(app, db);

// start listening
app.listen(config.port, ()=>{
  logger.info(`Tarmac running on : ${config.app_url}`)
});

// export
exports = module.exports = app;
