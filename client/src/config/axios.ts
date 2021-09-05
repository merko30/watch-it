import Axios from 'axios';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import AsyncStorage from '@react-native-community/async-storage';
>>>>>>> 8cca030ac362e63a3fa51c3a9f2b84c3cd6abd96

export const axios = Axios.create({
  baseURL: 'http://172.26.28.12:5000/api',
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
