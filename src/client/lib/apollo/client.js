import { ApolloClient, createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri  : 'http://localhost:3000/graph',
  opts : {
    // Additional fetch options like `credentials` or `headers`
    credentials : 'same-origin'
  }
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject : obj => obj.id
});

export default client;
