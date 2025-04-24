import Constants from 'expo-constants';
export const colors = {
  primary: '#2196f3',
  border: '#565656',
  red: '#EF5350',
  pink: '#EC407A',
  teal: '#26A69A',
  grey: '#BDBDBD',
};

export const config = {
  graphQlUrl: Constants.expoConfig?.extra?.url?.graphql,
  publicUrl: Constants.expoConfig?.extra?.url?.api,
};
