import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Button, Text, H1 } from "native-base";
import Axios from "axios";

const LandingScreen = ({ history }) => {
  const [loading, setLoading] = useState(true);
  async function checkAuth() {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      setLoading(false);
      Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
      history.push("/HomeScreen");
    }
    setLoading(false);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <H1
        style={{
          textTransform: "uppercase",
          marginBottom: 10,
          fontWeight: "bold"
        }}
      >
        Booker
      </H1>
      {!loading ? (
        <View style={{ flexDirection: "row" }}>
          <Button
            small
            rounded
            info
            style={{ margin: 5 }}
            onPress={() => history.push("/RegisterScreen")}
          >
            <Text>Sign Up</Text>
          </Button>
          <Button
            small
            rounded
            info
            style={{ margin: 5 }}
            onPress={() => history.push("/LoginScreen")}
          >
            <Text>Sign In</Text>
          </Button>
        </View>
      ) : (
        <Text style={{ fontSize: 12 }}>Please wait</Text>
      )}
    </View>
  );
};

export default LandingScreen;
