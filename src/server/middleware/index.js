module.exports = app => {
  require('./parser')(app);
  require('./headers')(app);
  require('./helmet')(app);
};
