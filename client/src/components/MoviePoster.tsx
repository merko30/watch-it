import React from 'react';
import {
  Image,
  StyleProp,
  ImageStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import { paper } from 'images';
import { useTheme } from '@shopify/restyle';
import { Theme } from 'theme';

interface MoviePosterProps {
  uri?: string;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
  pathSize?: 'w500' | 'w342' | 'w185';
}

const IMAGE_PATH = 'https://image.tmdb.org/t/p/';

const MoviePoster = ({
  uri,
  style,
  pathSize = 'w500',
  onPress,
}: MoviePosterProps) => {
  const { borderRadii } = useTheme<Theme>();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        style={[{ borderRadius: borderRadii.m }, style]}
        source={uri ? { uri: `${IMAGE_PATH}${pathSize}/${uri}` } : paper}
      />
    </TouchableWithoutFeedback>
  );
};

export default MoviePoster;
