/**
 * ENV
 */
module.exports.app_name = process.env.APP_NAME || 'Intro'
module.exports.env = process.env.NODE_ENV || 'development'
module.exports.production  = process.env.NODE_ENV === 'production'
module.exports.development = process.env.NODE_ENV !== 'production'

/**
 * PORTS
 */
const port = process.env.PORT || 3000
module.exports.port = port

const ws_port = process.env.WS_PORT || 5000
module.exports.ws_port = ws_port

/**
 * URLS
 */
const appUrl = process.env.APP_URL || `http://localhost:${port}/`
module.exports.app_url = appUrl;
module.exports.static_url = process.env.STATIC_URL || `${appUrl}public`;

const graphql_endpoint = process.env.GRAPH_ENDPOINT || "graph";
module.exports.graphql_endpoint = graphql_endpoint;

const graphql_subscriptions_endpoint = process.env.GRAPH_SUBS_ENDPOINT || "subscriptions";
module.exports.graphql_subscriptions_endpoint = graphql_subscriptions_endpoint;

module.exports.graph_url = process.env.GRAPH_URL || `${appUrl}${graphql_endpoint}/`;
module.exports.graphql_subscriptions_url = process.env.GRAPH_SUBS_URL || `ws://localhost:${ws_port}/${graphql_subscriptions_endpoint}`;

/**
 * DB
 */
module.exports.mongo_uri = process.env.MONGODB_URI || "mongodb://localhost/node-apollo-gql-react-kit";

/**
 * SESSION
 */
module.exports.session = {
  collection: 'sessions',
  secret: process.env.SESSION_SECRET || 'super_safe_secret',
  name: 'intro_session'
};

/**
 * PASSPORT
 */
module.exports.auth_jwt = {
  jwtSecret: process.env.JWT_SECRET || "JwT_t0p_53Cr3t",
  jwtSession: {
      session: false
  }
};

module.exports.auth_required = process.env.AUTH_REQUIRED === "true" ? true : false,

module.exports.auth_google = {
  enabled : process.env.GOOGLE_ENABLED === "true" ? true : false,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${appUrl}auth/google/callback`,
  scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  passReqToCallback: true,
};

