const config = require("../../config");

module.exports = (app, db) => {
  require('./parser')(app, db);
  require('./headers')(app, db);
  require('./helmet')(app, db);

  if (config.development)
    require('./graphiql')(app, db);

};
