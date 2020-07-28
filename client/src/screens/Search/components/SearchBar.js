import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { Icon } from "react-native-elements";

import { COLORS } from "../../../theme/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightBrown,
    padding: 8,
    alignItems: "center",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 8,
    paddingLeft: 10,
    flex: 2,
    marginRight: 15,
  },
  button: {
    color: "#eaae5b",
    flex: 1,
  },
  error: {
    alignSelf: "flex-start",
    color: "white",
    fontWeight: "100",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 1,
  },
});

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");
  const [error, setError] = useState(null);

  const search = () => {
    if (term) {
      setError(null);
      onSearch(term);
      setTerm("");
      Keyboard.dismiss();
    } else {
      setError("Type a search term");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.input}
          placeholder="Search for a book..."
          onChangeText={(term) => setTerm(term)}
          value={term}
        />
        <TouchableOpacity onPress={search}>
          <Icon name="search" style={styles.icon} color="white" />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default SearchBar;
