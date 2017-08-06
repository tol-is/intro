const Card  = require('./model');

module.exports = {

  findById : async (_id) => {
    return Card.findById(_id);
  },

  // List
  list : async () => {
    // query db
    const q = { deleted : false};
    return await Card.find(q);
  },

  // create
  create : async (args) => {
    let card = new Card(args);
    return await card.save();
  },

  // remove
  remove : async (_id) => {
    return Card.update({ _id }, { $set: { deleted: true } }, { multi:false });
  },

}
