import React from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard
} from "react-native";
import { connect } from "react-redux";

import { Icon } from "react-native-elements";

import { search } from "../store/actions";

import { backgroundColor, primaryColor } from "../styles/colors";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      error: ""
    };
  }

  search = () => {
    const { searchText } = this.state;
    if (searchText !== "") {
      this.setState({ error: "" });
      this.props.search(searchText);
      Keyboard.dismiss();
      this.setState({ searchText: "" });
    } else {
      this.setState({ error: "Type something..." });
    }
  };

  render() {
    const { error, searchText } = this.state;
    const { container, icon, input, errorStyle, flex } = styles;
    return (
      <View style={container}>
        <View style={flex}>
          <TextInput
            underlineColorAndroid="transparent"
            style={input}
            placeholder="Search for book..."
            onChangeText={text => this.setState({ searchText: text })}
            value={searchText}
          />
          <TouchableOpacity onPress={this.search}>
            <Icon name="search" style={icon} color="white" />
          </TouchableOpacity>
        </View>
        {error ? <Text style={errorStyle}>{error}</Text> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1793f6",
    padding: 9,
    alignItems: "center"
  },
  flex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row"
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 8,
    paddingLeft: 10,
    flex: 2,
    marginRight: 15
  },
  button: {
    color: "#eaae5b",
    flex: 1
  },
  errorStyle: {
    alignSelf: "flex-start",
    color: "white",
    marginTop: 6
  }
});

export default connect(
  null,
  { search }
)(SearchBar);
