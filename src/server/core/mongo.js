let mongoose = require('mongoose')
let config = require('../config');

module.exports = () => {
  let db

  mongoose.Promise = require('bluebird');

  let connect = function(){
    db = mongoose.createConnection(config.mongo_uri, {
      server: {
        socketOptions: {
          keepAlive: 1
        }
      },
      replset:{
        socketOptions: {
          keepAlive: 1
        }
      }
    }, function(error){
      if(error){
        console.error(':! connecting to mongo');
        console.error(error)
      }
    });
  };

  mongoose.connection.on('error', function(error){
    if(error.message.code === 'ETIMEDOUT'){
      console.warn(':! mongo connection timeout ');
      return
    }
    console.error(':! connecting to mongo ');
    console.error(error);
  });

  connect();
  mongoose.connection.on('disconnected', connect);

  return db;
}
