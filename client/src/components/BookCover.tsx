import React, {useEffect, useState} from 'react';
import {Image, StyleProp, ImageStyle} from 'react-native';
import {paper} from '../images';

interface BookCoverProps {
  uri?: string;
  ratio?: number;
  style?: StyleProp<ImageStyle>;
}

const BookCover = ({uri, style, ratio}: BookCoverProps) => {
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(120);

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (w, h) => {
        setWidth(w * (ratio ? ratio : 0.6));
        setHeight(h * (ratio ? ratio : 0.6));
      });
    }
  }, []);

  return (
    <Image
      source={{uri}}
      style={[{height, width}, style]}
      loadingIndicatorSource={paper}
    />
  );
};

export default BookCover;
