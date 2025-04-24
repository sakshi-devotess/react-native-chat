import React, { useCallback, useContext } from 'react';

import { AuthenticatedUserContext } from '../contexts/AuthenticatedUserContext';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppRoutesNavigator from './AppRoutesNavigator';

const RootNavigator = () => {
  const { user } = useContext(AuthenticatedUserContext);

  const renderRoutes = useCallback(() => {
    if (user) {
      return <AppRoutesNavigator />;
    }

    return <AuthNavigator />;
  }, [user]);

  return <NavigationContainer>{renderRoutes()}</NavigationContainer>;
};

export default RootNavigator;
