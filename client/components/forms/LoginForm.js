import React from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { Button, Text } from "native-base";
import { withRouter } from "react-router-native";

import { Formik } from "formik";
import * as Yup from "yup";

import TextField from "../TextField";
import Error from "../Error";

const loginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required field"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required field")
});

const LoginForm = ({ history, login, error, loading, ...props }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={values => login(values)}
      render={formikProps => {
        return (
          <View style={{ width, padding: 20 }}>
            {!loading ? (
              <View style={{}}>
                {error && <Error message={error} />}

                <TextField
                  formikProps={formikProps}
                  name="email"
                  label="Email"
                />

                <TextField
                  formikProps={formikProps}
                  name="password"
                  label="Password"
                />
                <Button
                  onPress={formikProps.handleSubmit}
                  style={{ alignItems: "center", justifyContent: "center" }}
                  rounded
                  success
                >
                  <Text>Sign In</Text>
                </Button>
                <Button
                  transparent
                  small
                  onPress={() => history.push("/RegisterScreen")}
                >
                  <Text>Don't have an account ? Create one.</Text>
                </Button>
              </View>
            ) : (
              <ActivityIndicator size="large" />
            )}
          </View>
        );
      }}
    />
  );
};

const { width } = Dimensions.get("window");

export default withRouter(LoginForm);
