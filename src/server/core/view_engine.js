let { join } = require('path')
let nunjucks = require('nunjucks')
let config = require('../config');

module.exports = app => {
  //views and templates
  let templates_path = join(__dirname, '../', 'templates');

  app.set("showStackError",  config.development);
  app.set("view cache", !config.development);

  let env = nunjucks.configure(templates_path, {
    extname : 'njk',
    autoescape: true,
    express: app
  })
}
