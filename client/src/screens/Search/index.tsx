import React from 'react';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@shopify/restyle';

import BookList from './components/BookList';
import SearchBar from './components/SearchBar';

import {search} from '../../store/reducers/books';
import {RootState} from '../../store/reducers';

import {Theme, Box} from '../../theme';

const Search = () => {
  const {colors} = useTheme<Theme>();
  const dispatch = useDispatch();
  const {searchResults: books, loadings} = useSelector(
    (state: RootState) => state.books,
  );

  const onSearch = (term: string) => {
    dispatch(search(term));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <SearchBar onSearch={onSearch} />
      <Box flex={1} justifyContent="center">
        {loadings.status && (
          <ActivityIndicator size="large" color={colors.foreground} />
        )}
        {books && !loadings.status && <BookList books={books} />}
      </Box>
    </SafeAreaView>
  );
};

export default Search;
