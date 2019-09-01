import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { errorTextColor, errorColor } from "../styles/colors";

const Error = ({ message }) => (
  <View style={styles.container}>
    {message && <Text style={styles.errorStyle}>{message}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  errorStyle: {
    color: errorTextColor,
    backgroundColor: errorColor,
    borderColor: errorTextColor,
    borderWidth: 1,
    padding: 8,
    paddingLeft: 12,
    borderRadius: 12
  }
});

export default Error;
