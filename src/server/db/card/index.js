const Card  = require('./model');

module.exports = () => {

  // find by id
  this.findById = async (_id) => {
    return Card.findById(_id);
  }

  // List
  this.list = async () => {
    // query db
    const q = { deleted : false};
    return await Card.find(q);
  }

  // create
  this.create = async (args) => {
    let card = new Card(args);
    return await card.save();
  }

  // remove
  this.remove = async (_id) => {
    return Card.update({ _id }, { $set: { deleted: true } }, { multi:false });
  }

  // return closure
  return this;

}
