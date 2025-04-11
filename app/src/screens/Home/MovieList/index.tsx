import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';

import { Box, Theme } from '@/theme';

import { Movie, MovieStatus } from 'types';

import MoviePoster from '@/components/MoviePoster';

import { MOVIELIST_HEIGHT, MOVIELIST_MAP } from '../constants';
import Header from './Header';

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 90,
  },
  bookList: {
    justifyContent: 'flex-start',
    padding: 10,
  },
});

interface MovieListProps {
  movies: any[];
  title: string;
  name: MovieStatus;
  isLast: Boolean;
  expanded: SharedValue<boolean>;
  index: number;
}

const MovieList = ({
  title,
  movies,
  name,
  isLast,
  index,
  expanded: shelfExpanded,
}: MovieListProps) => {
  const [snapToInterval, setSnapToInterval] = useState(0);
  const expanded = useSharedValue(0);
  const { shadows } = useTheme<Theme>();

  const transformMovies = useCallback((moviesArr: Movie[]) => {
    const movieArrays: Movie[][] = [];

    for (var i = 0; i < moviesArr.length; i += 2) {
      movieArrays.push(moviesArr.slice(i, i + 2));
    }
    return movieArrays;
  }, []);

  const scaleInterpolation = interpolate(
    index,
    [0, 1, 2, 3],
    [0.85, 0.9, 0.95, 1],
    Extrapolation.CLAMP,
  );

  const renderMovie = (item: Movie[]) => {
    const [first, second] = item;
    return (
      <Box alignItems="flex-start" my="m">
        {first && (
          <MoviePoster style={styles.image} key={first.id} uri={first.image} />
        )}
        {second && (
          <MoviePoster
            style={styles.image}
            key={second.id}
            uri={second.image}
          />
        )}
      </Box>
    );
  };

  const onExpand = () => {
    expanded.value = expanded.value === 0 ? 1 : 0;
  };

  const moviesArray = useMemo(
    () => transformMovies(movies),
    [movies, transformMovies],
  );

  const animatedStyles = useAnimatedStyle(() => ({
    marginBottom: withSpring(
      !isLast
        ? expanded.value
          ? 0
          : -MOVIELIST_HEIGHT + (shelfExpanded.value ? 36 : 20)
        : 0,
    ),
    transform: [{ scale: shelfExpanded.value ? 1 : scaleInterpolation }],
  }));

  return (
    <Animated.View style={animatedStyles}>
      <Box
        flex={1}
        height={MOVIELIST_HEIGHT}
        bg={MOVIELIST_MAP[name] as keyof Theme['colors']}
        borderRadius="m"
        {...shadows}>
        <Header title={title} name={name} onExpand={onExpand} />
        <FlatList
          onLayout={e => setSnapToInterval(e.nativeEvent.layout.width)}
          data={moviesArray}
          keyExtractor={item => item.map(i => i.id).join('')}
          horizontal
          snapToInterval={snapToInterval}
          contentContainerStyle={[
            styles.bookList,
            {
              width: snapToInterval * (moviesArray.length / 3),
            },
          ]}
          decelerationRate="fast"
          scrollEventThrottle={1}
          renderItem={({ item }) => renderMovie(item)}
        />
      </Box>
    </Animated.View>
  );
};

export default MovieList;
