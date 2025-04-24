import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axios = Axios.create({
  baseURL: 'http://192.168.1.201:4000/api',
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
