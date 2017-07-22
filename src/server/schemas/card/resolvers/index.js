const card_list = require('./card_list');
const card_find = require('./card_find');
const card_create = require('./card_create');
const card_delete = require('./card_delete');

// const require_all = require('require-all');

// var resolvers = require_all({
//   dirname : __dirname,
//   filter  : name => name === 'index' ? name : false
// });

// console.log(resolvers);

module.exports = {
  card_list,
  card_find,
  card_create,
  card_delete
};
