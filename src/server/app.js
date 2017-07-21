let config = require("./config");

let app = require("./core")();

// start listening
app.listen(config.port, ()=>{
  console.log(`Tarmac running on : ${config.app_url}`)
});

exports = module.exports = app;
