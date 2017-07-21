module.exports = (req, res, next) => {
  // TODO ALLOW CROSS ORIGIN STATIC ASSETS FROM WEBPACK DEV SERVER
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
};
