const CardConnector = require('./card');
const UserConnector = require('./user');

module.exports = {
  Card: new CardConnector(),
  User: new UserConnector()
}
