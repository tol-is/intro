const serialize = require('serialize-javascript');
const statics = require('../../common/statics-manifest.json');

const {
  development,
  static_url
} = require('../config');

module.exports = app => {
  app.get("*", (req, res) => {

    const state = serialize({
      viewer        : req.user,
      authenticated : req.user !== undefined
    }, { isJSON : true });

    const tarmac = static_url + (development ? 'tarmac.js' : statics['tarmac.js']);
    const vendors = static_url + (development ? 'vendors.js' : statics['vendors.js']);

    res.render('index.njk', {
      static_url,
      state,
      tarmac,
      vendors
    });

  });

};
