import React from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';

import {formatName} from '../utils';

interface AuthorsProps {
  authors: string[];
  textStyle?: StyleProp<TextStyle>;
  numberOfLines: number;
}

const Authors = ({authors, textStyle, numberOfLines}: AuthorsProps) => {
  return (
    <Text numberOfLines={numberOfLines} style={textStyle}>
      {authors.map((author, i) => {
        const isLast = i === authors.length - 1;
        return `${formatName(author)} ${isLast ? '' : '| '}`;
      })}
    </Text>
  );
};

export default Authors;
