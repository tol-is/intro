/**
 * ENV
 */
module.exports.app_name = 'Tarmac'
module.exports.app = process.env.NODE_APP || 'all'
module.exports.env = process.env.NODE_ENV || 'development'
module.exports.production  = process.env.NODE_ENV === 'production'
module.exports.development = process.env.NODE_ENV !== 'production'

/**
 * PORTS
 */
let port = process.env.PORT || 3000
module.exports.port = port

/**
 * URLS
 */
module.exports.static_url = process.env.STATIC_URL || `http://localhost:${port}/`;
module.exports.app_url = process.env.APP_URL || `http://localhost:${port}/`
module.exports.graph_url = process.env.API_URL || `http://localhost:${port}/graphql/`;


/**
 * DB
 */
module.exports.mongo_uri = process.env.MONGODB_URI || "mongodb://localhost/node-apollo-gql-react-kit";
