import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";

import store from "./store";
import { signInAction } from "./store/actions";

import Splash from "./screens/Splash";
import Navigation from "./navigation";

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  async function checkAuth() {
    // await AsyncStorage.removeItem("token");
    const token = await AsyncStorage.getItem("token");

    if (token) {
      store.dispatch(signInAction.success());
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
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
