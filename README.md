# Tarmac

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
        _id, title, description
      }
    }

#### Find Card By ID

    query{
      card_find_by_id(_id: "card_id"){
        _id, title, description
      }
    }

## Mutations

#### Create Card

    mutation {
    	card_create(title: "YourTitle", description: "YourDescription") {
    		_id, title, description
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
        _id, title, description
      }
    }



## Recipes

#### Connector

#### Subscriptions

#### Dataloader


