import React from 'react';
import {ImageSourcePropType, Image, StyleProp, ImageStyle} from 'react-native';
import {avatar} from '../images';

interface AvatarProps {
  size: number;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
}

const Avatar = ({source, size, style}: AvatarProps) => {
  return (
    <Image
      source={source}
      defaultSource={avatar}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    />
  );
};

export default Avatar;
