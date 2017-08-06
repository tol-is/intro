const BaseConnector = require('../base_connector');
const Card  = require('./model');

class CardConnector extends BaseConnector {

  async create ({ title, description, owner }) {
    let card = new Card({
      owner,
      title,
      description
    });
    return await card.save();
  }

  async findById (_id) {
    return Card.findById(_id);
  }

  async list (args) {
    // make query
    const query = args || {};
    query.deleted = false;

    // query db
    const results = await Card.find(query);
    return results;
  }

  async delete (_id) {
    return Card.findById(_id);
  }

}
module.exports = new CardConnector();
