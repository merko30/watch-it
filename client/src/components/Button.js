import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13
  },
  buttonText: {
    color: "white"
  }
});

const Button = ({ onPress, color, containerStyle, textStyle, text }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }, containerStyle]}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
