let GraphQLScalarType = require('graphql').GraphQLScalarType
let Kind = require('graphql/language').Kind

module.exports = new GraphQLScalarType({
  name        : 'Date',
  description : 'Date custom scalar type',
  parseValue  : function(value){ return new Date(value)},
  serialize   : function(value){ return value.getTime()},
  parseLiteral: function(ast){
    if(ast.kind === Kind.INT){
      return parseInt(ast.value,10)
    }
    return null
  }
})
