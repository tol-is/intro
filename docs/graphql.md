
-------------

## Data Connectors

`src/server/db`

Data connectors are set of modules designed to encapsulate data access, regardless of the source or destination. For example a data connector can read/write data to/from a mongodb, sequelize, elasticsearch, redis or a third party REST api.

Any actors consuming data, will be more elegantly implemented, as they are unaware of query languages or apis.

### Card Connector

Cards are represented in a mongoose collection, so its connector mostly encapsulates mongoose queries.

    // Mongoose Model dependency
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

#### Card Mongoose Model

    const cardSchema = new mongoose.Schema({

      owner : {
        type     : mongoose.Schema.Types.ObjectId,
        required : true,
        index    : true
      },

      title : {
        type     : String,
        required : true,
        trim     : true
      },

      description : {
        type     : String,
        required : true,
        trim     : true
      },

      deleted : {
        type     : Boolean,
        required : true,
        index    : true,
        default  : false
      },

      created_date : {
        type    : Date,
        default : Date.now,
        index   : true
      }
    });

    module.exports = mongoose.model('Card', cardSchema);

-------------

### User Connector

Users are represented in a mongoose collection, so its connector mostly encapsulates mongoose queries.

    const DataLoader = require('dataloader');
    const User = require('./model');

    module.exports = () => {

      // find by id
      this.findById = async (_id) => {
        return User.findById(_id);
      }

      // create
      this.create = async (args) => {
        let user = new User(args);
        return await user.save();
      }

      // list
      this.list = async () => {
        const q = {};
        return await User.find(q);
      }

      // async find user by email
      this.findByProp = async (prop, value) => {
        let q = {};
        q[prop] = value;
        return await User.findOne(q);
      }

      // async find user by email
      this.findByEmail = async (email) => {
        return await this.findByProp('email', email);
      }

      // async find user by google oauth id
      this.findByProvider = async (provider, provider_id) => {
        let user = {};
        if (provider === 'google')
          return await this.findByGoogleId(provider_id);
      }

      // async find user by google oauth id
      this.findByGoogleId = async (google_id) => {
        const providerQuery = { google: { id : google_id } };
        return await User.findOne(providerQuery)
      }

      // user loader
      this.loader = new DataLoader(async (user_ids) => {
        let res = await User.find({_id: {$in: user_ids}});
        return user_ids.map(_id => res.find(r => r._id.toString() === _id.toString()));
      })

      // return closure
      return this;

    }

#### User Mongoose Model

    const userSchema = new mongoose.Schema({

      name_first : {
        type : String,
        trim : true
      },

      name_last : {
        type : String,
        trim : true
      },

      email : {
        type     : String,
        required : true,
        index    : true,
      },

      google_id : {
        type   : String,
        sparse : true,
        unique : true
      },

      google_token : {
        type : String
      }

    });

    module.exports = mongoose.model('User', userSchema);

-------------

## GraphQL

`src/server/api`

### Schema/Resolvers

`src/server/api/module_name`

Individual schemas and resolvers

-------------

### Resolvers

`src/server/api/module_name/resolvers`

Resolvers are designed to rely on as little required dependencies as possible. The current viewer, data connectors and pubsub engine are available through the context.

-------------

#### Context

All resolvers receive all required dependencies within their context parameter. THe purpose is to minimize required dependencies.

###### Viewer

Current authenticated user, by session or jwt token.

###### DB

Data Connectors.

###### PubSub

PubSub client

-------------

### Card

    const { withFilter } = require('graphql-subscriptions');

    const {
      owner,
      card_find_by_id,
      card_list,
      card_create,
      card_delete,
      card_created,
    } = require('./resolvers');

    const db = require('../../db');

    // pubsub
    const pubsub = require('../../graphql/pubsub');

    const { CARD_CREATED_SUB } = require('./constants');

    module.exports.types = `
      type Card {
        _id : ID
        owner : User
        title : String
        description : String
        deleted : Boolean
        created_date : Date
      }
    `;

    module.exports.queries = `
      card_list : [Card]

      card_find_by_id (
        _id : String!
      ): Card
    `;

    module.exports.mutations = `
      card_create (
        title : String!
        description : String!
      ): Card

      card_delete (
        _id : String!
      ): Boolean
    `;

    // Subscriptions
    module.exports.subscriptions = `
      card_created (
        _id: String
      ) : Card
    `;

    // Prop Resolvers
    const Card = {
      owner
    };

    // Query Resolvers
    const Query = {
      card_list,
      card_find_by_id
    }

    // Mutation Resolvers
    const Mutation = {
      card_create,
      card_delete
    };

    // Subscription Resolvers
    const Subscription = {
      card_created: {
        resolve: card_created,
        subscribe: () => pubsub.asyncIterator(CARD_CREATED_SUB)
        // subscribe: withFilter(() => pubsub.asyncIterator(CARD_CREATED_SUB), (payload, args) => true)
      }
    };

    // Export Resolvers
    module.exports.resolvers = {
      Card,
      Query,
      Mutation,
      Subscription
    };

##### Card List Resolver

    module.exports = async (root, args, ctx) => {
      // get data connector
      const { Card } = ctx.db;
      // find cards
      return await Card.list(args);
    };

##### Card Owner Resolver

Example with dataloader.

    module.exports = async (card, args, ctx, parent) => {
      return ctx.db.User.loader.load(card.owner);
    }

-------------

### User

    const {
      user_list,
      user_find_by_id,
    } = require('./resolvers');

    module.exports.types = `
      type User {
        _id : ID
        email : String
        name_first : String
        name_last : String
        created_date : Date
      }
    `;

    module.exports.queries = `
      user_list : [User]

      user_find_by_id (
        _id : String!
      ): User
    `;

    module.exports.mutations = ``;

    module.exports.resolvers = {
      Query : {
        user_list,
        user_find_by_id
      }
    };
]

##### User List Resolver

    module.exports = async (root, args, ctx) => {
      // get data connector
      const { User } = ctx.db;
      // find cards
      return await User.list();
    };

##### User Owner Resolver

Example with Boom error.

    const { SevenBoom } = require('graphql-apollo-errors');

    module.exports = async (root, { _id }, ctx) => {
      // get data connector
      const { User } = ctx.db;
      // find user
      const result = await User.findById({ _id });
      // return if found
      if (result) return result;

      // throw 404
      const errorMessage = `User with id: ${ _id } not found`;
      const errorData = { _id };
      const errorName = 'USER_NOT_FOUND';
      const err = SevenBoom.notFound(errorMessage, errorData, errorName);
      throw err;
    };

-------------

### GraphiQL

Access to GraphiQL from [http://localhost:3000/graphiql](http://localhost:3000/graphiql)

#### Queries

##### List Cards

    query {
      card_list() {
        _id, title, description, owner
      }
    }

##### Find Card By ID

    query{
      card_find_by_id(_id: "card_id"){
        _id, title, description, owner
      }
    }

##### List Users

    query {
      user_list() {
        _id, name_first, name_last, email
      }
    }

##### Find User By ID

    query{
      user_find_by_id(_id: "user_id"){
        _id, name_first, name_last, email
      }
    }

-------------

#### Mutations

##### Create Card

    mutation {
      card_create(title: "YourTitle", description: "YourDescription") {
        _id, title, description, owner
      }
    }

##### Delete Card

    mutation {
      card_delete(_id: "card_id")
    }

-------------

#### Subscriptions

##### Card Created

    subscription{
      card_created{
        _id, title, description, owner
      }
    }


