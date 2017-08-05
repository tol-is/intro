const BaseConnector = require('../base_connector');
const Card  = require('./model');

class CardConnector extends BaseConnector {

  async createNewCard ({ title, description, owner }) {
    let card = new Card({
      owner,
      title,
      description
    });
    return await card.save();
  }

  async findOneById (_id) {
    return Card.findById(_id);
  }

  async listCards (args) {
    // make query
    const query = args || {};
    query.deleted = false;

    // query db
    const results = await Card.find(query);
    return results;
  }

  async deleteCard (_id) {
    return Card.findById(_id);
  }

}
module.exports = new CardConnector();
