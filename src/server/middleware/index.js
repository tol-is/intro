const config = require("../config");

module.exports = app => {
  require('./parser')(app);
  require('./headers')(app);
  require('./helmet')(app);

  if (config.development)
    require('./graphiql')(app);

};
