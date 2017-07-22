let card_list = require('./lib/card_list');
let card_find = require('./lib/card_find');
let card_create = require('./lib/card_create');
let card_delete = require('./lib/card_delete');

module.exports = {

  Card : {},

  Query : {
    card_list,
    card_find
  },

  Mutation : {
    card_create
  }
}
