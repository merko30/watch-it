import React, { useCallback } from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '@shopify/restyle';
// import {AxiosError, AxiosResponse} from 'axios';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { searchMovies } from 'api/movies';

import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';

import { Theme, Box } from 'theme';

import { TMDBMovie } from 'types';

const Search = () => {
  const { colors } = useTheme<Theme>();

  const { data, mutate, error, isLoading } = useMutation<
    AxiosResponse<{ results: TMDBMovie[] }>,
    AxiosError<{ error: string }>,
    string
  >((term: string) => searchMovies(term));

  const { results } = data?.data || {};

  // console.log(results);

  const onSearch = useCallback((term: string) => mutate(term), [mutate]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <SearchBar onSearch={onSearch} />
      <Box flex={1} justifyContent="center">
        {isLoading && (
          <ActivityIndicator size="large" color={colors.foreground} />
        )}
        {results && !isLoading && <MovieList movies={results} />}
      </Box>
    </SafeAreaView>
  );
};

export default Search;
