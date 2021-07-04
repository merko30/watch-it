import React from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {useTheme} from '@shopify/restyle';
// import {AxiosError, AxiosResponse} from 'axios';
import {useMutation} from 'react-query';

import {searchMovies} from 'api/movies';

// import BookList from './components/BookList';
import SearchBar from './components/SearchBar';

import {Theme, Box} from '../../theme';

const Search = () => {
  const {colors} = useTheme<Theme>();

  const {mutate, error, isLoading, data} = useMutation((input: string) =>
    searchMovies(input),
  );

  console.log(error);

  console.log(data);

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
        {/* {books && !isLoading && <BookList books={books} />} */}
      </Box>
    </SafeAreaView>
  );
};

export default Search;
