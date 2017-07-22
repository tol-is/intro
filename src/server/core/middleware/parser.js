const parser = require('body-parser');

module.exports = app => {
  //
  app.use(parser.urlencoded({
    extended : true,
    limit    : '50mb'
  }));
  //
  app.use(parser.json({ limit: '50mb' }));
};
