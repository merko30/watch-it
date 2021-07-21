import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleProp,
  ImageStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import { paper } from 'images';

interface MoviePosterProps {
  uri?: string;
  ratio?: number;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
  pathSize?: 'w500' | 'w342' | 'w185';
}

const IMAGE_PATH = 'https://image.tmdb.org/t/p/';

const MoviePoster = ({
  uri,
  style,
  ratio,
  pathSize = 'w500',
  onPress,
}: MoviePosterProps) => {
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(120);

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (w, h) => {
        setWidth(w * (ratio ? ratio : 0.6));
        setHeight(h * (ratio ? ratio : 0.6));
      });
    }
  }, [ratio, uri]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image
        source={uri ? { uri: `${IMAGE_PATH}${pathSize ?? ''}/${uri}` } : paper}
        style={[{ height, width }, style]}
      />
    </TouchableWithoutFeedback>
  );
};

export default MoviePoster;
