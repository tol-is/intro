const path      = require('path')
const nunjucks  = require('nunjucks')
// const serialize = require('serialize-javascript')
const statics   = require('../../common/statics-manifest.json');

const {
  development,
  static_url
} = require('../config');

module.exports = app => {

  app.get("*", (req, res) => {
    let tarmac  = static_url + (development ? 'tarmac.js' : statics['tarmac.js']);
    let vendors = static_url + (development ? 'vendors.js' : statics['vendors.js']);
    res.render('index.njk', {
      static_url,
      tarmac,
      vendors
    });
  });

};
