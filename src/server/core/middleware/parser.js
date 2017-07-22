let parser = require('body-parser')

module.exports = (app, db) => {
  //
  app.use(parser.urlencoded({
    extended: true,
    limit   : '50mb'
  }));
  //
  app.use(parser.json({
    limit: '50mb'
  }));
}
