import React from "react";
import { Text } from "react-native";

import { formatName } from "../utils";

const Authors = ({ authors, textStyle, numberOfLines }) => {
  return (
    <Text numberOfLines={numberOfLines} style={textStyle}>
      {authors.map((author, i) => {
        const isLast = i === authors.length - 1;
        return `${formatName(author)} ${isLast ? "" : "| "}`;
      })}
    </Text>
  );
};

export default Authors;
