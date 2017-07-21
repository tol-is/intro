let parser = require('body-parser')
let headers = require('./headers')

module.exports = (app) => {

  app.use(parser.urlencoded({
    extended: true,
    limit   : '50mb'
  }));

  app.use(parser.json({
    limit: '50mb'
  }));

  app.use(headers);

}
