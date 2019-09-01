import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";

import RegisterForm from "../components/forms/RegisterForm";
import { register } from "../store/actions";

const RegisterScreen = ({ register, error, loading }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <RegisterForm register={register} error={error} loading={loading} />
    </View>
  );
};

export default connect(
  ({ auth: { loading, error } }) => ({ loading, error }),
  { register }
)(RegisterScreen);
