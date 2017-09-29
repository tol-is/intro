const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { mongo_uri } = require('../config');

const mongooseConnection = mongoose.connect(mongo_uri, {
  useMongoClient : true,
  keepAlive      : 1
});

module.exports = mongooseConnection;
