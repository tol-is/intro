let helmet = require('helmet');

module.exports = (app) => {

  ///some small XSS protections
  app.use(helmet.xssFilter())

  //keep clients from sniffing the MIME type
  app.use(helmet.noSniff())

  // sets X-Download-Options for IE8+
  app.use(helmet.ieNoOpen())

  // remove the X-Powered-By header
  app.use(helmet.hidePoweredBy())

  // prevent clickjacking
  app.use(helmet.frameguard())

}
