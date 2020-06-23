import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';

export const createApolloClient = () => {
  const client = new ApolloClient({
    uri: 'https://api-corona.azurewebsites.net/graphql',
    fetch: fetch,
  });
  return client;
};

