const express = require('express');

// get config
const config = require("./config");

// Create express app
const app = express();

// http and websocket server;
const server = require('./server_http')(app);
const ws_server = require('./server_websocket')(app);

// mongo connect
const mongooseConnection = require("./lib/mongoose_connect");

// Init Passport
require("./passport")(app, mongooseConnection);

// Init middlewares
require('./middleware')(app);

// Init view engine
require('./templates')(app);

// Init Routes
require("./routes")(app, ws_server);

// export app
module.exports = app;
