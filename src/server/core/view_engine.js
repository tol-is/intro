const { join } = require('path');
const nunjucks = require('nunjucks');
const config = require('../config');

module.exports = app => {
  // views and templates
  const templates_path = join(__dirname, '../', 'templates');

  app.set("showStackError", config.development);
  app.set("view cache", !config.development);

  nunjucks.configure(templates_path, {
    extname    : 'njk',
    autoescape : true,
    express    : app
  });
};
