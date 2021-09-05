import React, {createContext, SetStateAction, useEffect, useState} from 'react';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import AsyncStorage from '@react-native-community/async-storage';
>>>>>>> 8cca030ac362e63a3fa51c3a9f2b84c3cd6abd96

export interface IAuthContext {
  loggedIn: boolean;
  loading: boolean;
  setLoggedIn?: (value: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedIn: false,
  loading: false,
});

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // await AsyncStorage.removeItem('token');
      const token = await AsyncStorage.getItem('token');
      console.log(token);

      if (token) {
        setLoggedIn(true);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        loading,
        setLoggedIn: (value: Boolean) =>
          setLoggedIn(value as SetStateAction<boolean>),
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
