import React from 'react';
import {View, ImageSourcePropType, Image} from 'react-native';

interface AvatarProps {
  size: number;
  source: ImageSourcePropType;
}

const Avatar = ({source, size}: AvatarProps) => {
  return (
    <Image
      source={source}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    />
  );
};

export default Avatar;
