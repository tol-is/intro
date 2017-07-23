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
const port = process.env.PORT || 3000
module.exports.port = port

/**
 * URLS
 */
const appUrl = process.env.APP_URL || `http://localhost:${port}/`
module.exports.app_url = appUrl;
module.exports.static_url = process.env.STATIC_URL || `${appUrl}static`;
module.exports.graph_url = process.env.API_URL || `${appUrl}graphql/`;

/**
 * DB
 */
module.exports.mongo_uri = process.env.MONGODB_URI || "mongodb://localhost/node-apollo-gql-react-kit";

/**
 * SESSION
 */
module.exports.session = {
  collection: 'sessions',
  secret: process.env.SESSION_SECRET || 'super-safe-secret',
  name: 'tarmac'
};

/**
 * PASSPORT
 */
module.exports.auth_google = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${appUrl}auth/google/callback`,
  scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  passReqToCallback: true,
};

