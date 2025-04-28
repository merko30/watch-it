import { User, LoginData, VerifyResetCodeParams } from '../types';
import { axios } from '../config/axios';
import { AxiosResponse } from 'axios';

const API_URL = '/auth';

export const createUser = (data: Partial<User>) => {
  return axios.post(`${API_URL}/register`, data);
};

export const loginUser = async (data: LoginData) => {
  return await axios.post(`${API_URL}/login`, data);
};

export const fetchUser = async (): Promise<AxiosResponse<{ user: User }>> => {
  return await axios.get(`${API_URL}/user`);
};

export const updateAvatar = async (formData: FormData) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return await axios.put(`${API_URL}/avatar`, formData, {
    headers,
  });
};

export const sendResetMail = async (email: string) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};

export const verifyCode = async ({ code, email }: VerifyResetCodeParams) => {
  return await axios.put(`${API_URL}/verify/${code}`, { email });
};

export const updateUser = async (
  data: Partial<User> & {
    newPassword?: string;
  },
) => {
  return await axios.put(`${API_URL}/user`, data);
};

export const updateEmailRequest = async (email: string) => {
  return await axios.put(`${API_URL}/email`, { email });
};
