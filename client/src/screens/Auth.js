import React from "react";
import { View } from "react-native";
import { LoginButton, AccessToken } from "react-native-fbsdk";

import Button from "../components/Button";

const Auth = ({ navigation }) => {
  return (
    <View style={{ flex: 1, padding: 30 }}>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log("login has error: " + result.error);
          } else if (result.isCancelled) {
            console.log("login is cancelled.");
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log("logout.")}
      />
      <Button onPress={() => navigation.navigate("Login")}>Login</Button>
    </View>
  );
};

export default Auth;
