import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../config/constants';
import backImage from '../assets/signupBg.jpg';
import { useForm, Controller } from 'react-hook-form';
import authApiInstance from '../services/auth/auth';
import { AuthenticatedUserContext } from '../contexts/AuthenticatedUserContext';
import * as SecureStore from 'expo-secure-store';

export default function Login({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(AuthenticatedUserContext);
  const onSubmit = async (data: any) => {
    try {
      const res = await authApiInstance.signIn({
        username: data.username,
        password: data.password,
      });
      if (res.response.success) {
        const userData = {
          access_token: res.access_token,
          refresh_token: res.refresh_token,
          companyHasUserId: res.companyHasUserId,
        };

        await SecureStore.setItemAsync('userData', JSON.stringify(userData));
        await setUser(userData);
      } else {
        Alert.alert('Login failed');
      }
    } catch (err: any) {
      console.log('err :>> ', err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            rules={{
              required: 'Username is required',
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter username"
                autoCapitalize="none"
                textContentType="username"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="username"
          />
          {errors.username && (
            <Text style={styles.errorText}>{String(errors.username.message)}</Text>
          )}
        </View>
        <View style={styles.inputGroup}>
          <Controller
            control={control}
            rules={{
              required: 'Password is required',
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                textContentType="password"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="password"
          />

          {errors.password && (
            <Text style={styles.errorText}>{String(errors.password.message)}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Log In</Text>
        </TouchableOpacity>
        <View
          style={{ marginTop: 30, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}
        >
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>
            Don&apos;t have an account? &nbsp;
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Text style={{ color: colors.pink, fontWeight: '600', fontSize: 14 }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  backImage: {
    height: 340,
    position: 'absolute',
    resizeMode: 'cover',
    top: 0,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 58,
    justifyContent: 'center',
    marginTop: 40,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  input: {
    backgroundColor: '#F6F7FB',
    borderRadius: 10,
    fontSize: 16,
    height: 58,
    padding: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  title: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 34,
    fontWeight: 'bold',
    paddingBottom: 24,
  },
  whiteSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    bottom: 0,
    height: '75%',
    position: 'absolute',
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
});

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};
