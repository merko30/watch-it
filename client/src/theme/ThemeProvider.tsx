import React, {createContext, useContext, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider as RestyleProvider} from '@shopify/restyle';
import AsyncStorage from '@react-native-community/async-storage';

import {themes, Theme as ThemeType} from 'theme';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

const ThemeContext = createContext({
  mode: 'light' as Theme,
  toggleTheme: () => {},
});

const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [mode, setMode] = useState<Theme>('light' as Theme);

  useEffect(() => {
    async () => {
      const mode = await AsyncStorage.getItem('theme');

      if (mode) {
        setMode(mode as Theme);
      }
    };
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode as Theme);
  };

  return (
    <ThemeContext.Provider value={{mode, toggleTheme}}>
      <StatusBar
        barStyle={mode === Theme.LIGHT ? 'dark-content' : 'light-content'}
        translucent={true}
      />
      <RestyleProvider theme={themes[mode]}>{children}</RestyleProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
