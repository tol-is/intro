import * as sharedReducers from '../reducers';
import { combineReducers } from 'redux';

import ApolloClient from '../lib/apollo/client';

const configureReducer = (platformReducers={}) => {

  const reducer = combineReducers({
    ...platformReducers,
    ...sharedReducers,
    apollo : ApolloClient.reducer()
  });

  return reducer;
};

export default configureReducer;
