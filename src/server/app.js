const logger = require('minilog')('app');
const express = require('express');
const { createServer } = require('http');

// get config
const config = require("./config");

// Create express app
const app = express();
const server = createServer(app)

// mongo connect
const mongooseConnection = require("./db/mongoose_connect");

// Init middlewares
require('./middleware')(app);

// Init view engine
require('./templates')(app);

// Init Passport
require("./passport")(app, mongooseConnection);

// Init Routes
require("./routes")(app);

// init graph
require("./graphql")(app);

// start listening
app.listen(config.port, ()=>{
  logger.info(`Tarmac running on : ${config.app_url}`)
});

// export
module.exports = app;
