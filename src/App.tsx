// import 'react-native-url-polyfill/auto';
import { registerRootComponent } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { View, ActivityIndicator } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import React from 'react';

import { UnreadMessagesContext, UnreadMessagesProvider } from './contexts/UnreadMessagesContext';
import { AuthenticatedUserProvider } from './contexts/AuthenticatedUserContext';
import RootNavigator from './navigation/RootNavigator';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client/main.cjs';
import { client } from './graphql/graphql';

const App = () => (
  <MenuProvider>
    <ApolloProvider client={client}>
      <AuthenticatedUserProvider>
        <UnreadMessagesProvider>
          <RootNavigator />
        </UnreadMessagesProvider>
      </AuthenticatedUserProvider>
    </ApolloProvider>
  </MenuProvider>
);

export default registerRootComponent(App);
