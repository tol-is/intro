# Intro

Starter kit, with NodeJS, Apollo Graphql, React, Redux. Focuses on clean architecture and best practises.

------------

## Install

##### Mongodb

To run on localhost you'll need to run mongodb locally, or configure the environment variables to consume a remote database.

#### Node Version Manager

Nvm is recommended to manage multiple active node.js versions [https://github.com/creationix/nvm](https://github.com/creationix/nvm)

    nvm install 8.2
    nvm use

##### Google auth

Google auth is required, only authenticated users can execute queries and mutations.

Update the file `.env-cmdrc` with your google client id and secret

    "GOOGLE_CLIENT_ID" : "111111111111-abcd1234abcd1234abcd1234abcd1234.apps.googleusercontent.com",
    "GOOGLE_CLIENT_SECRET" : "AbCdEfGhIjKlMnOpQrStUvWxyz"

##### Install dependencies
    npm install

##### Run Application

    npm start

-------

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

### Schema/Resolvers

`src/server/api`

### Resolvers

Resolvers are designed to rely on as little required dependencies as possible. The current viewer, data connectors and pubsub engine are available through the context.

#### Context
- viewer
- dB
  - User
  - Card
- pubsub

### Card

-------------

### User

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


