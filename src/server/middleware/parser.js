const parser = require('body-parser');

module.exports = app => {
  // url encoded
  app.use(parser.urlencoded({
    extended : true,
    limit    : '50mb'
  }));

  // json parser
  app.use(parser.json({ limit : '50mb' }));
};
