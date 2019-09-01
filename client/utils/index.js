import React from "react";

import { View } from "react-native";
import { Text } from "native-base";

export const formatName = authorName => {
  const splited = authorName.split(" ");
  const initials = splited.slice(0, splited.length - 1).map(s => {
    return s.substr(0, 1) + ".";
  });
  const name = `${initials} ${splited[splited.length - 1]}`;
  return name.replace(/\,/g, "").toUpperCase();
};

export const renderAuthors = (authors, authorsStyle, authorStyle) => {
  return (
    <View style={authorsStyle}>
      {authors &&
        authors.map((a, i) => {
          if (a == authors[authors.length - 1]) {
            return (
              <Text style={authorStyle} key={i}>
                {`${formatName(a)}`}
              </Text>
            );
          } else if (a == authors[0]) {
            return (
              <Text style={authorStyle} key={i}>
                {`${formatName(a)} | `}
              </Text>
            );
          } else {
            return (
              <Text style={authorStyle} key={i}>
                {` ${formatName(a)} | `}
              </Text>
            );
          }
        })}
    </View>
  );
};

var ImagePicker = require("react-native-image-picker");

export const setAvatar = Component => {
  // More info on all the options is below in the README...just some common use cases shown here
  var options = {
    title: "Select Avatar",
    storageOptions: {
      skipBackup: true,
      path: "images"
    }
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info below in README)
   */
  ImagePicker.showImagePicker(options, response => {
    // You can also display the image using data:
    // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    Component.setState({
      data: {
        ...Component.state.data,
        avatar: {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        }
      }
    });
  });
};

export const validateEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
