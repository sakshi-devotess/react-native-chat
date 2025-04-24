import {
  ApolloClient,
  ApolloProvider,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/main.cjs';
import { config } from '../config/constants';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err?.extensions?.code) {
        case 'UNAUTHENTICATED': {
          //get refresh token from store
          const token = SecureStore.getItemAsync('userData').then((data) => {
            const parsedData = JSON.parse(data!);
            return parsedData?.refreshToken;
          });
        }
        case 'FORBIDDEN':
          alert('Forbidden to access the resource');
          break;
      }
    }
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const httpLink = new HttpLink({ uri: config.graphQlUrl, fetch });

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const storedUserData = await SecureStore.getItemAsync('userData');
  const token = storedUserData ? JSON.parse(storedUserData)?.access_token : null;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(from([errorLink, httpLink])),

  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
