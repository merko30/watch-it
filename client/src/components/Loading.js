import React from "react";
import { View, ActivityIndicator, Dimensions, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: "white",
    opacity: 0.7,
    zIndex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Loading = ({ show }) => {
  return show ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.darkBrown} />
    </View>
  ) : null;
};

export default Loading;
