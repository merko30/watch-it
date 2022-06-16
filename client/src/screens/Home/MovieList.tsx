import React, { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { RootStackParamList } from 'navigation';

import { Box, Text, Theme } from 'theme';

import { Movie, MovieStatus } from 'types';

import MoviePoster from 'components/MoviePoster';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useTheme } from '@shopify/restyle';

export const MOVIELIST_HEIGHT = 320;
export const TITLE_HEIGHT = 35;

const MOVIELIST_MAP = {
  wishlist: 'gold',
  watching: 'orange',
  watched: 'secondary',
  'watch-again': 'primary',
};

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 90,
  },
  bookList: {
    justifyContent: 'flex-start',
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
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { shadows } = useTheme<Theme>();

  const transformMovies = useCallback((moviesArr: Movie[]) => {
    const movieArrays: Movie[][] = [];

    for (var i = 0; i < moviesArr.length; i += 2) {
      movieArrays.push(moviesArr.slice(i, i + 2));
    }
    return movieArrays;
  }, []);

  const expanded = useSharedValue(0);

  const scaleInterpolation = interpolate(
    index,
    [0, 1, 2, 3],
    [0.85, 0.9, 0.95, 1],
    Extrapolate.CLAMP,
  );

  const moviesArray = useMemo(
    () => transformMovies(movies),
    [movies, transformMovies],
  );

  const renderBook = (item: Movie[]) => {
    return (
      <Box alignItems="flex-start" my="m">
        {item[0] && (
          <MoviePoster
            style={styles.image}
            key={item[0]._id}
            uri={item[0].poster_path}
          />
        )}
        {item[1] && (
          <MoviePoster
            style={styles.image}
            key={item[1]._id}
            uri={item[1].poster_path}
          />
        )}
      </Box>
    );
  };

  const onExpand = () => {
    expanded.value = expanded.value === 0 ? 1 : 0;
  };

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
        <Box
          flexDirection="row"
          flex={1}
          justifyContent="space-between"
          pt="xs"
          px="s">
          <TouchableWithoutFeedback onPress={onExpand}>
            <Text fontWeight="600" textTransform="uppercase">
              {title}
            </Text>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={() => navigate('List', { shelf: name })}>
            <Text variant="body">Show all movies</Text>
          </TouchableOpacity>
        </Box>
        <FlatList
          onLayout={e => setSnapToInterval(e.nativeEvent.layout.width)}
          data={moviesArray}
          keyExtractor={item => item.map(i => i._id).join('')}
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
          renderItem={({ item }) => renderBook(item)}
        />
      </Box>
    </Animated.View>
  );
};

export default MovieList;
