import { User, LoginData, VerifyResetCodeParams } from '../types';
import { axios } from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const API_URL = '/auth';

export const createUser = (data: Partial<User>) => {
  return axios.post(`${API_URL}/register`, data);
};

export const loginUser = async (data: LoginData) => {
  return await axios.post(`${API_URL}/login`, JSON.stringify(data));
};

export const fetchUser = async () => {
  return await axios.get(`${API_URL}/user`);
};

export const updateAvatar = async (formData: FormData) => {
  const token = await AsyncStorage.getItem('token');
  const headers = {
    Authorization: token,
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  return await Axios.put(
    `http://192.168.1.8:5000/api${API_URL}/avatar`,
    formData,
    {
      headers,
    },
  );
};

export const sendResetMail = async (email: string) => {
  return await axios.post(`${API_URL}/forgot`, { email });
};

export const updatePassword = async (email: string, password: string) => {
  return await axios.put(`${API_URL}/reset`, { email, password });
};

export const verifyCode = async ({ code, email }: VerifyResetCodeParams) => {
  return await axios.put(`${API_URL}/verify/${code}`, { email });
};

export const updateUserRequest = async (data: Partial<User>) => {
  return await axios.put(`${API_URL}/user`, data);
};

export const updateEmailRequest = async (email: string) => {
  return await axios.put(`${API_URL}/email`, { email });
};

export const updatePasswordRequest = async (
  password: string,
  newPassword: string,
) => {
  return await axios.put(`${API_URL}/password`, { password, newPassword });
};
