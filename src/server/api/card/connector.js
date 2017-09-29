const Card = require('./model');

const BaseConnector = () => {

  // find by id
  this.findById = async _id => await Card.findById(_id);

  // List
  this.list = async () => {
    // query db
    const q = { deleted : false };
    return await Card.find(q);
  };

  // create
  this.create = async args => {
    const card = new Card(args);
    return await card.save();
  };

  // remove
  this.remove = async _id => await Card.update({ _id }, { $set : { deleted : true } }, { multi : false });

  // return closure
  return this;

};


const connector = BaseConnector();
module.exports = connector;

