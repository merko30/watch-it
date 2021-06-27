/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {LoginData, User} from 'types';
import {createUser, loginUser} from 'api/users';
import {navigate} from 'utils/navigation';

export interface IAuthContext {
  loggedIn: boolean;
  loading: boolean;
  error?: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext({
  loggedIn: false,
  loading: false,
  error: null,
  login: async (_: LoginData) => new Promise(resolve => resolve(null)),
  register: async (_: Partial<User>) => new Promise(resolve => resolve(null)),
});

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setLoggedIn(true);
      }

      setLoading(false);
    };
  }, []);

  const login = async (data: LoginData) => {
    setLoading(true);
    try {
      const {
        data: {token},
      } = await loginUser(data);
      await AsyncStorage.setItem('token', `Bearer ${token}`);
      setLoading(false);
      setLoggedIn(true);
    } catch (error) {
      console.log({error});
      setLoading(false);
      setError(error);
    }
  };

  const register = async (data: Partial<User>) => {
    setLoading(true);
    try {
      await createUser(data);
      navigate('Login');
      setLoading(false);
      setLoggedIn(true);
    } catch (error) {
      console.log({error});
      setLoading(false);
      setError(error);
    }
  };

  return (
    <AuthContext.Provider value={{loggedIn, login, error, register, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
