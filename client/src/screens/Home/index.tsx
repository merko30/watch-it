import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Box, Theme } from 'theme';

import { getAll } from 'api/movies';

import { Movie } from 'types';

import MovieList from './MovieList';

import { MOVIE_LISTS } from './constants';
import { useTheme } from '@shopify/restyle';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const Home = () => {
  const [movieLists] = useState(MOVIE_LISTS);

  const { spacing } = useTheme<Theme>();

  const { data } = useQuery<
    AxiosResponse<{ movies: Movie[] }>,
    AxiosError,
    AxiosResponse<{ movies: Movie[] }>
  >('movies', getAll);

  const { movies = [] } = data?.data || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingHorizontal: spacing.s },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Box
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          mb="m">
          <Text variant="subtitle">Your lists</Text>
          {/* TODO: ADD BUTTON FOR SEE ALL */}
          <Text variant="body">See all</Text>
        </Box>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}>
          {movieLists.map((list, index, arr) => {
            return (
              <MovieList
                movies={movies.filter(b => b.status === list.name)}
                name={list.name}
                title={list.title}
                key={list.name}
                isLast={index === arr.length - 1}
              />
            );
          })}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
