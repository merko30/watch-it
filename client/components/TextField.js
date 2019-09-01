import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TextInput } from "react-native";

import { Text } from "native-base";

export default class TextField extends PureComponent {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string
  };

  static defaultProps = {
    name: ""
  };

  render() {
    const { container, input, labelStyle } = styles;
    const {
      label,
      name,
      formikProps: { handleBlur, handleChange, errors, values, touched }
    } = this.props;
    return (
      <View style={container}>
        {label && <Text style={labelStyle}>{label}</Text>}
        <TextInput
          style={input}
          name={name}
          value={values[name]}
          onChangeText={handleChange(name)}
          secureTextEntry={name == "password"}
          onBlur={handleBlur(name)}
        />
        {errors[name] && touched[name] && (
          <Text style={{ color: "crimson", marginVertical: 10 }}>
            {errors[name]}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingVertical: 8
  },
  container: {
    margin: 10
  },
  labelStyle: {
    marginVertical: 5
  }
});
