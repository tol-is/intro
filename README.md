# Intro

Starter kit, with NodeJS, Apollo Graphql, React, Redux. Focuses on clean architecture and best practises.

------------

## Install

##### Mongodb

To run on localhost you'll need to run mongodb locally, or configure the environment variables to consume a remote database.

##### Node Version Manager

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

-------------

## Recipes

#### Server Side
- Apollo/GraphQL/Express/Mongoose
- ESLint node next/recommended
- Leverage async/await (sexy)
- Separate data origin/destination from resolvers
- Dataloader
- Modular schema definitions
- Websocket subscriptions
- Error formatting
- Passport session auth

#### Client Side
- Shared client side code
- React Router v4
- Modal Routes
- Redux
- Webpack 3
- Code splitting
- Static files caching
- Sweet eslinting
