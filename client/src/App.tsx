import React, {useEffect, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {ThemeProvider} from '@shopify/restyle';

import store from './store';
import {setLoggedIn} from './store/reducers/auth';

import {Splash} from './screens';
import Navigation from './navigation';

import {themes} from './theme';
import {StatusBar} from 'react-native';

import {RootState} from './store/reducers';

import {Theme, toggleTheme} from './store/reducers/ui';

function App() {
  const [loading, setLoading] = useState(true);
  async function checkAuth() {
    // await AsyncStorage.removeItem('token');
    const token = await AsyncStorage.getItem('token');

    if (token) {
      store.dispatch(setLoggedIn());
    }
  }

  async function checkTheme() {
    const theme = await AsyncStorage.getItem('theme');
    if (theme && theme !== store.getState().ui.theme.toString()) {
      store.dispatch(toggleTheme());
    }
  }

  useEffect(() => {
    (async () => {
      await checkAuth();
      await checkTheme();

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    })();
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;

const AppContainer = () => {
  const {theme} = useSelector((state: RootState) => state.ui);

  return (
    <ThemeProvider theme={themes[theme]}>
      <StatusBar
        barStyle={theme === Theme.LIGHT ? 'dark-content' : 'light-content'}
        translucent={true}
      />
      <Navigation />
    </ThemeProvider>
  );
};
