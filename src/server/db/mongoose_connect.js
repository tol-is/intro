const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const config = require('../config');

const mongooseConnection = mongoose.connect(config.mongo_uri, {
  useMongoClient : true,
  keepAlive      : 1
});

module.exports = mongooseConnection;
