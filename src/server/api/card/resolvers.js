let Card = require('./model');

module.exports = {

  Card : {

  },

  Query : {
    card_list : (root, args) => {
      let query = args || {}
      console.log(query);
      // return Card.find(query); // should work but nope
      return Promise.resolve([]);
    },

    card_find : (root, query) => {
      console.log(query);
      // return Card.findOne(query) // should work but nope
      Promise.resolve({
        _id: '1',
        title: 'Yay'
      });
    }
  },

  Mutation : {
    card_create : (root, args) => {
      let card = new Card(args)
      return card.save();
    }
  }
}
