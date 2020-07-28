import React from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import TextField from "../components/TextField";
import Error from "../components/Error";
import Button from "../components/Button";

import { login } from "../store/actions";

import { rootStyles } from "../theme/rootStyles";

import { COLORS } from "../theme/colors";

const loginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required field"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required field"),
});

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <View style={rootStyles.fullScreenCenter}>
      <Formik
        initialValues={{ email: "john@mm.com", password: "password" }}
        validationSchema={loginSchema}
        onSubmit={(values) => dispatch(login(values))}
        render={(formikProps) => {
          return (
            <View style={{ width, padding: 20 }}>
              {!loading ? (
                <View>
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
                    color={COLORS.darkBrown}
                    onPress={formikProps.handleSubmit}
                    style={{ alignItems: "center", justifyContent: "center" }}
                    text="Sign in"
                    containerStyle={{ marginTop: 10 }}
                    textStyle={{ textTransform: "uppercase" }}
                  />
                  <Button
                    textStyle={{
                      color: COLORS.darkBrown,
                      alignSelf: "flex-start",
                    }}
                    containerStyle={{ paddingLeft: 0 }}
                    color="transparent"
                    onPress={() => navigation.navigate("Register")}
                    text="Don't have an account ? Create one."
                  />
                </View>
              ) : (
                <ActivityIndicator size="large" />
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default LoginScreen;
