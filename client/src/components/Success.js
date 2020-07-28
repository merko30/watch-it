import React from "react";

import { View, Text, StyleSheet } from "react-native";

const Success = ({ message }) => (
  <View style={styles.container}>
    {message && <Text style={styles.successStyle}>{message}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  successStyle: {
    color: "#006442",
    backgroundColor: "#8DB255",
    borderColor: "#006442",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8
  }
});

export default Success;
