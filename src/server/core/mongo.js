const mongoose = require('mongoose');
const config = require('../config');

module.exports = () => {

  mongoose.Promise = require('bluebird');

  const db = mongoose.createConnection(config.mongo_uri, {
    useMongoClient : true,
    keepAlive      : 1
  });

  return db;
};
