import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import { RootStackParamList } from 'navigation';

import { Box, Text, Theme } from 'theme';

import { Movie, MovieStatus } from 'types';

import MoviePoster from 'components/MoviePoster';

export const MOVIELIST_HEIGHT = 320;
export const TITLE_HEIGHT = 35;

const MOVIELIST_MAP = {
  wishlist: 'gold',
  watching: 'secondary',
  watched: 'primary',
  'watch-again': 'dark',
};

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 90,
  },
  bookList: {
    justifyContent: 'flex-start',
  },
  title: {
    flex: 1,
  },
});

interface MovieListProps {
  movies: any[];
  title: string;
  name: MovieStatus;
}

const MovieList = ({ title, movies, name }: MovieListProps) => {
  const [snapToInterval, setSnapToInterval] = useState(0);
  const [moviesArray, setMoviesArray] = useState<Movie[][]>([]);
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const transformMovies = useCallback((moviesArr: Movie[]) => {
    const movieArrays: Movie[][] = [];

    for (var i = 0; i < moviesArr.length; i += 2) {
      movieArrays.push(moviesArr.slice(i, i + 2));
    }
    return movieArrays;
  }, []);

  useEffect(() => {
    setMoviesArray(transformMovies(movies));
  }, [movies, transformMovies, setMoviesArray]);

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

  return (
    <Box
      flex={1}
      height={MOVIELIST_HEIGHT}
      bg={MOVIELIST_MAP[name] as keyof Theme['colors']}>
      <Box flexDirection="row" flex={1} justifyContent="space-between">
        <View>
          <Text color="foreground" variant="body" style={styles.title}>
            {title}
          </Text>
        </View>
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
  );
};

export default MovieList;
