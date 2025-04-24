import React, { useContext } from 'react';
import { View, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Cell from '../components/Cell';
import { colors } from '../config/constants';
import { AuthenticatedUserContext } from '../contexts/AuthenticatedUserContext';

const Account = () => {
  const { setUser } = useContext(AuthenticatedUserContext);
  const onSignOut = () => {
    SecureStore.deleteItemAsync('userData');
    setUser(null);
  };

  const deleteAccount = () => {
    Alert.alert('Account Deleted Touched');
  };

  return (
    <View>
      <Cell
        title="Blocked Users"
        icon="close-circle-outline"
        tintColor={colors.primary}
        onPress={() => {
          Alert.alert('Blocked users touched');
        }}
        style={{ marginTop: 20 }}
      />
      <Cell
        title="Logout"
        icon="log-out-outline"
        tintColor={colors.grey}
        onPress={() => {
          Alert.alert(
            'Logout?',
            'You have to login again',
            [
              {
                text: 'Logout',
                onPress: () => {
                  onSignOut();
                },
              },
              {
                text: 'Cancel',
              },
            ],
            { cancelable: true }
          );
        }}
        showForwardIcon={false}
      />
      <Cell
        title="Delete my account"
        icon="trash-outline"
        tintColor={colors.red}
        onPress={() => {
          Alert.alert(
            'Delete account?',
            'Deleting your account will erase your message history',
            [
              {
                text: 'Delete my account',
                onPress: () => {
                  deleteAccount();
                },
              },
              {
                text: 'Cancel',
              },
            ],
            { cancelable: true }
          );
        }}
        showForwardIcon={false}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Account;
