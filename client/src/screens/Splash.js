import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { rootStyles } from "../theme/rootStyles";
import { COLORS } from "../theme/colors";

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    marginBottom: 10,
    fontFamily: "Calistoga-Regular",
    color: COLORS.darkBrown
  },
  background: {
    backgroundColor: COLORS.lightestBrown
  }
});

const LandingScreen = ({}) => {
  return (
    <View style={[rootStyles.fullScreenCenter, styles.background]}>
      <Text style={styles.title}>Booker</Text>
    </View>
  );
};

export default LandingScreen;
