import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const axios = Axios.create({
  baseURL: 'http://192.168.1.10:5000/api',
  timeout: 5000,
});

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers['Content-type'] = 'application/json';

    console.log(config.headers);

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
