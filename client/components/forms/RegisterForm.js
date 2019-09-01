import React, { useState } from "react";
import { View, Dimensions, ActivityIndicator, Image } from "react-native";
import { Button, Text } from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";

import TextField from "../TextField";
import pickImage from "../../utils/pickImage";

// import images from "../../assets/images";

const registerSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password should be longer than 8 characters")
    .required("Password is required field"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required field"),
  name: Yup.string()
    .required("Name is required field")
    .min(6, "Name must have at least six characters")
});

const RegisterForm = ({ history, error, register, loading, ...props }) => {
  const [profilePhoto, setProfilePhoto] = useState({});

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "" }}
      onSubmit={values => register({ ...values, profilePhoto })}
      validationSchema={registerSchema}
      render={formikProps => {
        return (
          <View
            style={{
              width,
              justifyContent: "center",
              padding: 20
            }}
          >
            {!loading ? (
              <View>
                {error && <Error message={error} />}
                <View
                  style={{
                    alignSelf: "center"
                  }}
                >
                  {profilePhoto && Object.keys(profilePhoto).length > 0 && (
                    <Image
                      source={{ uri: profilePhoto.uri }}
                      style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
                    />
                  )}
                  {/* insert avatar placeholder */}
                </View>
                <Button
                  rounded
                  transparent
                  small
                  onPress={() =>
                    pickImage("Set profile photo", setProfilePhoto)
                  }
                  style={{ marginVertical: 20, alignSelf: "center" }}
                >
                  <Text>Set profile photo</Text>
                </Button>

                <TextField formikProps={formikProps} name="name" label="Name" />

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
                  rounded
                  success
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>Register</Text>
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

const { width, height } = Dimensions.get("window");

export default RegisterForm;
