import React from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {useTheme} from '@shopify/restyle';
// import {AxiosError, AxiosResponse} from 'axios';
import {useMutation} from 'react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {searchMovies} from 'api/movies';

import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';

import {Theme, Box} from 'theme';

import {TMDBMovie} from 'types';

const Search = () => {
  const {colors} = useTheme<Theme>();

  const {data, mutate, isLoading} = useMutation<
    AxiosResponse<{data: {results: TMDBMovie[]}}>,
    AxiosError<{error: string}>,
    string
  >((term: string) => searchMovies(term));

  const {data: {results: movies = []} = {}} = data?.data || {};

  const onSearch = (term: string) => mutate(term);

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
        {movies && !isLoading && <MovieList movies={movies} />}
      </Box>
    </SafeAreaView>
  );
};

export default Search;
