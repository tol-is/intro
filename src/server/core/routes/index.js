
module.exports = app => {
  // Handle health check routes
  require("./health")(app);
  // html render
  require("./client")(app);
};
