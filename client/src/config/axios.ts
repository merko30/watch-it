import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axios = Axios.create({
  baseURL: 'http://192.168.1.30:5000/api',
  timeout: 5000,
});

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;

      console.log(`Bearer ${token}`);
    }

    config.headers['Content-type'] = 'application/json';

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
