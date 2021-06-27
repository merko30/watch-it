import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const axios = Axios.create({
  baseURL: 'http://192.168.1.10:5000/api',
  timeout: 5000,
});

axios.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');

    config.headers['Content-type'] = 'application/json';
    config.headers.Authorization = token;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
