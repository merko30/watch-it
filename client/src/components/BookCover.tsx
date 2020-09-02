import React, {useEffect, useState} from 'react';
import {Image, StyleProp, ImageStyle} from 'react-native';

interface BookCoverProps {
  uri: string;
  ratio?: number;
  style?: StyleProp<ImageStyle>;
}

const BookCover = ({uri, style, ratio = 0.6}: BookCoverProps) => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    Image.getSize(uri, (w, h) => {
      setWidth(w * ratio);
      setHeight(h * ratio);
    });
  }, []);

  return <Image source={{uri}} style={[{height, width}, style]} />;
};

export default BookCover;
