# Intro

Starter kit, with NodeJS, Apollo Graphql, React, Redux. Focuses on clean architecture and best practises.

------------

## Install

    nvm install 8.2
    nvm use 8.2
    npm install
    npm start

-------

## GraphiQL

Access to GraphiQL from [http://localhost:3000/graphiql](http://localhost:3000/graphiql)


## GraphQL

## Queries

#### List Cards

    query {
      card_list() {
        _id, title, description, owner
      }
    }

#### Find Card By ID

    query{
      card_find_by_id(_id: "card_id"){
        _id, title, description, owner
      }
    }

#### List Users

    query {
      user_list() {
        _id, name_first, name_last, email
      }
    }

#### Find User By ID

    query{
      user_find_by_id(_id: "user_id"){
        _id, name_first, name_last, email
      }
    }

## Mutations

#### Create Card

    mutation {
    	card_create(title: "YourTitle", description: "YourDescription") {
    		_id, title, description, owner
    	}
    }

#### Delete Card

    mutation {
      card_delete(_id: "card_id")
    }

## Subscriptions

#### Card Created

    subscription{
      card_created{
        _id, title, description, owner
      }
    }


## Recipes

#### Async/Await

#### Connector

#### Subscriptions

#### Dataloader


