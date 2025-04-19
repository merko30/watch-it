import React from 'react';
import {
  ImageSourcePropType,
  Image,
  StyleProp,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import { avatar } from '../images';

interface AvatarProps {
  size: number;
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

const Avatar = ({ source, size, style, onPress }: AvatarProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  );
};

export default Avatar;
