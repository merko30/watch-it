import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {ThemeProvider} from '@shopify/restyle';

import store from './store';
import {setLoggedIn} from './store/reducers/auth';

import {Splash} from './screens';
import Navigation from './navigation';

import theme from './theme';

function App() {
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    // await AsyncStorage.removeItem('token');
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    if (token) {
      store.dispatch(setLoggedIn());
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await checkAuth();
    })();
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
