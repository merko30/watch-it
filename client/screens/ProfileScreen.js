import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Text } from "native-base";

import { signOut } from "../store/actions";

import Profile from "../components/Profile";

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Profile screen</Text>
      </View>
    );
  }
}

export default connect(
  ({}) => ({}),
  { signOut }
)(ProfileScreen);
