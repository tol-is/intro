const Card = require('./model');

class CardConnector {

  async createNewCard (args) {
    let card = new Card(args);
    return await card.save();
  }

  async listCards (args) {
    // make query
    const query = args || {};
    query.deleted = false;

    // query db
    const results = await Card.find(query);
    return results;
  }
}
module.exports = CardConnector;
