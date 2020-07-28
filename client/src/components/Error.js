import React from "react";

import { View, Text, StyleSheet } from "react-native";

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
    color: "red",
    backgroundColor: "blue",
    borderColor: "red",
    borderWidth: 1,
    padding: 8,
    paddingLeft: 12,
    borderRadius: 12
  }
});

export default Error;
