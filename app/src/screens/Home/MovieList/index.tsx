import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';

import { Theme } from '@/theme';

import { Movie, MovieStatus } from 'types';

import MoviePoster from '@/components/MoviePoster';

import { navigate } from '@/utils/navigation';

import { MOVIELIST_HEIGHT, MOVIELIST_MAP } from '../constants';
import Header from './Header';

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 120,
    marginBottom: 5,
  },
  bookList: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: 10,
  },
});

interface MovieListProps {
  movies: Movie[];
  title: string;
  name: MovieStatus;
  isLast: Boolean;
  expanded: SharedValue<boolean>;
  index: number;
  verticalSpace: SharedValue<number>;
}

const MovieList = ({
  title,
  movies,
  name,
  isLast,
  index,
  expanded: statusExpanded,
  verticalSpace,
}: MovieListProps) => {
  const [snapToInterval, setSnapToInterval] = useState(0);
  const expanded = useSharedValue(0);
  const { shadows } = useTheme<Theme>();

  const scaleInterpolation = interpolate(
    index,
    [0, 1, 2, 3],
    [0.85, 0.9, 0.95, 1],
    Extrapolation.CLAMP,
  );

  const onExpand = () => (expanded.value = expanded.value === 0 ? 1 : 0);

  const animatedStyles = useAnimatedStyle(() => ({
    marginBottom: withSpring(
      !isLast
        ? expanded.value
          ? 0
          : -MOVIELIST_HEIGHT +
            (statusExpanded.value ? 36 : verticalSpace.value)
        : 0,
    ),
    transform: [
      {
        scale: statusExpanded.value ? 1 : scaleInterpolation,
      },
    ],
  }));

  return (
    <Animated.View style={animatedStyles}>
      <Animated.View
        style={[
          {
            width: '100%',
            borderRadius: 20,
            height: MOVIELIST_HEIGHT,
            backgroundColor: MOVIELIST_MAP[name],
            ...shadows,
          },
        ]}>
        <Header title={title} name={name} onExpand={onExpand} />
        <FlatList
          // numColumns={4}
          onLayout={e => setSnapToInterval(e.nativeEvent.layout.width)}
          data={movies}
          horizontal
          keyExtractor={item => item.id.toString()}
          snapToInterval={snapToInterval}
          contentContainerStyle={[
            styles.bookList,
            {
              // width: snapToInterval * (movies.length / 3),
              gap: 10,
            },
          ]}
          decelerationRate="fast"
          scrollEventThrottle={1}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigate('MovieDetails', {
                  id: item.id,
                  name: item.title,
                })
              }>
              <MoviePoster uri={item.image} style={styles.image} />
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default MovieList;
