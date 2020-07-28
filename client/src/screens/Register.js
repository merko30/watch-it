import React from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import TextField from "../components/TextField";
import Error from "../components/Error";
import Button from "../components/Button";

import { rootStyles } from "../theme/rootStyles";

import { register } from "../store/actions";

import { COLORS } from "../theme/colors";

const { width } = Dimensions.get("window");

const registerSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password should be longer than 8 characters")
    .required("Password is required field"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required field"),
  name: Yup.string()
    .required("Name is required field")
    .min(6, "Name must have at least six characters"),
});

const Register = ({ navigation }) => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  return (
    <View style={rootStyles.fullScreenCenter}>
      <Formik
        initialValues={{
          email: "john@m.com",
          password: "password",
          name: "Johnny Doe",
        }}
        onSubmit={(values) => dispatch(register(values))}
        validationSchema={registerSchema}
        render={(formikProps) => {
          return (
            <View
              style={{
                width,
                justifyContent: "center",
                padding: 20,
              }}
            >
              {!loading ? (
                <View>
                  {error && <Error message={error} />}

                  <TextField
                    formikProps={formikProps}
                    name="name"
                    label="Name"
                  />

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
                    text="Sign up"
                  />
                  <Button
                    textStyle={{
                      color: COLORS.darkBrown,
                      alignSelf: "flex-start",
                    }}
                    containerStyle={{ paddingLeft: 0 }}
                    color="transparent"
                    text="Sign in"
                    onPress={() => navigation.navigate("Login")}
                    text="Have an account ? Sign in."
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

export default Register;
