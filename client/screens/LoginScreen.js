import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import LoginForm from "../components/forms/LoginForm";

import { login } from "../store/actions";

const LoginScreen = ({ loading, error, login }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LoginForm login={login} error={error} loading={loading} />
    </View>
  );
};

export default connect(
  ({ auth: { loading, error } }) => ({ loading, error }),
  { login }
)(LoginScreen);
