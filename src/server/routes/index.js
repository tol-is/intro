
module.exports = app => {
  // Handle health check routes
  require("./health")(app);
  // auth
  require("./auth/google")(app);
  // html render
  require("./client")(app);
};
