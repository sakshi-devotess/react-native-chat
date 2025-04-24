import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Linking, StyleSheet } from 'react-native';
import Cell from '../components/Cell';
import { colors } from '../config/constants';
import ContactRow from '../components/ContactRow';
import { AuthenticatedUserContext } from '../contexts/AuthenticatedUserContext';

const Settings = ({ navigation }) => {
  async function openGithub(url) {
    await Linking.openURL(url);
  }
  const { user } = useContext(AuthenticatedUserContext);
  return (
    <View>
      <ContactRow
        name={user?.username ?? 'No name'}
        style={styles.contactRow}
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />

      <Cell
        title="Account"
        subtitle="Privacy, logout, delete account"
        icon="key-outline"
        onPress={() => {
          navigation.navigate('Account');
        }}
        iconColor="black"
        style={{ marginTop: 20 }}
      />

      <Cell
        title="Help"
        subtitle="Contact us, app info"
        icon="help-circle-outline"
        iconColor="black"
        onPress={() => {
          navigation.navigate('Help');
        }}
      />

      <Cell
        title="Invite a friend"
        icon="people-outline"
        iconColor="black"
        onPress={() => {
          alert('Share touched');
        }}
        showForwardIcon={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contactRow: {
    backgroundColor: 'white',
    borderColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  githubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  githubLink: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 20,
    justifyContent: 'center',
    marginTop: 20,
    width: 100,
  },
});

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Settings;
