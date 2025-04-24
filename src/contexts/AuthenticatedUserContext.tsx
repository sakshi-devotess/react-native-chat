import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect, createContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { GET_CURRENT_USER } from '../graphql/queries/User/user.query';
import { useQuery } from '@apollo/client';

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [shouldQuery, setShouldQuery] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const stored = await SecureStore.getItemAsync('userData');
        if (stored) {
          const parsedUser = JSON.parse(stored);
          if (parsedUser?.companyHasUserId) {
            setUser(parsedUser);
            setShouldQuery(true);
          }
        }
      } catch (error) {
        console.error('Error accessing SecureStore:', error);
      }
    };
    checkUser();
  }, []);

  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    skip: !shouldQuery,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data?.getCurrentUser) {
      setUser(data.getCurrentUser);
    }
  }, [data]);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthenticatedUserContext.Provider value={value}>{children}</AuthenticatedUserContext.Provider>
  );
};

AuthenticatedUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
