const express = require('express');

// get config
const config = require("./config");

// Create express app
const app = express();

// http and websocket server;
const server = require('./http')(app);
const ws_server = require('./websocket')(app);

// mongo connect
const mongooseConnection = require("./db/mongoose_connect");

// Init Passport
require("./passport")(app, mongooseConnection);

// Init middlewares
require('./middleware')(app);

// Init view engine
require('./templates')(app);

// Init Routes
require("./routes")(app);

// init graph
require("./graphql")(app, ws_server);

// export app
module.exports = app;
