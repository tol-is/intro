// import { applyMiddleware, compose } from 'redux'
// import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// import shortid from 'shortid';

import ApolloClient from '../lib/apollo/client';

const configureMiddleware = (platformMiddleware = {}) => {

  const middleware = [
    ...platformMiddleware,
    ApolloClient.middleware(),
    thunkMiddleware.withExtraArgument({
      apollo : ApolloClient,
      // getUid: () => shortid.generate(),
      now    : () => Date.now()
    })
  ];

  return middleware;

};

export default configureMiddleware;
