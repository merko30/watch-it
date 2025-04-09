import React, {createContext, SetStateAction, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAuthContext {
  loggedIn: boolean;
  loading: boolean;
  setLoggedIn?: (value: boolean) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedIn: false,
  loading: false,
  logOut: () => {},
});

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');
      console.log(token);

      if (token) {
        setLoggedIn(true);
      }

      setLoading(false);
    })();
  }, []);

  const logOut = async () => {
    await AsyncStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        loading,
        logOut,
        setLoggedIn: (value: Boolean) =>
          setLoggedIn(value as SetStateAction<boolean>),
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
