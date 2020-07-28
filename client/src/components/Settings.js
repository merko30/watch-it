import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

import { connect } from "react-redux";

import { signOut } from "../store/actions";
import EditField from "./EditField";

class Settings extends Component {
  render() {
    const { user, error } = this.props;
    const { container } = styles;
    return (
      <View style={container}>
        {user && (
          <View>
            <EditField field="name" value={user.name} />
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            this.props.signOut();
          }}
        >
          <Text>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
});

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    error: state.auth.error
  };
};

export default connect(
  mapStateToProps,
  { signOut }
)(Settings);
