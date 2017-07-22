let config = require("../../config");

module.exports = (app, db) => {
  // Handle health check routes
  require("./health")(app);
  // html render
  require("./client")(app);

};
