import axios from 'axios';
import { config } from '../../config/constants';
import { Alert } from 'react-native';

const request = axios.create({
  baseURL: config.publicUrl,
  timeout: 1 * 60 * 1000, // 1 minute
  headers: {
    Accept: 'application/json',
  },
  // withCredentials: true,
});

request.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const { response } = error;
    const prevRequestConfig = error.config;
    switch (response?.status) {
      // Authorization Failed Response Manage Here
      case 401:
        Alert.alert('Session expired');
        break;
      case 400:
        Alert.alert('Not found !!');
        break;
      default:
        Alert.alert('Something went wrong !!');
        break;
    }
    return Promise.reject(error);
  }
);

export default request;
