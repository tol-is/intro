# Tarmac

Starter kit, with NodeJS, Apollo Graphql,

------------

## Install
    nvm use
    npm install
    npm start

or

    nvm install 8.2
    nvm use 8.2
    npm install
    npm start

-------

## Modules
  - src/server/api

-------

## GraphiQL

Access to GraphiQL from [http://localhost:3000/graphiql](http://localhost:3000/graphiql)


#### Create Card

    mutation {
    	card_create(title: "YourTitle", description: "YourDescription") {
    		_id, title, description
    	}
    }

#### List Cards

    mutation {
    	card_list() {
    		_id, title, description
    	}
    }

#### Find Card

    query {
    	card_list(title: 'YourTitle', description: "YourDescription') {
    		_id, title, description
    	}
    }

#### Delete Card

    mutation {
    	card_delete(_id: cardId)
    }



