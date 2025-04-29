import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Config from 'react-native-config';

// console.log('API URL: ', Config.API_URL);

// if (!Config.API_URL) {
//   throw new Error('API_URL is not defined in .env file');
// }

export const axios = Axios.create({
  baseURL: 'http://192.168.1.132:4000/api',
  timeout: 10000,
});

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      console.log(`Bearer ${token}`);
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-type'] = 'application/json';
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
