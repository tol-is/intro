let mongoose = require('mongoose')
let config = require('../config');

module.exports = () => {

  mongoose.Promise = require('bluebird');

  var db = mongoose.connect(config.mongo_uri, {
    useMongoClient: true,
    keepAlive: 1
  });

  return db;
}
