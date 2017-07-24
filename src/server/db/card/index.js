const BaseConnector = require('../base_connector');
const Card  = require('./model');

class CardConnector extends BaseConnector {

  async createNewCard ({ title, description }) {
    let card = new CardModel({
      title,
      description
    });
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
module.exports = new CardConnector();
