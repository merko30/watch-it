import React, {useEffect} from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@shopify/restyle';

import Loading from '../../components/Loading';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';

import {search} from '../../store/reducers/books';
import {RootState} from '../../store/reducers';
import {Theme} from '../../theme';

const Search = () => {
  const {colors} = useTheme<Theme>();
  const dispatch = useDispatch();
  const {books, loading} = useSelector(
    ({books: {searchResults, loading}}: RootState) => ({
      books: searchResults,
      loading,
    }),
  );

  // useEffect(() => {}, [books]);

  const onSearch = (term: string) => {
    dispatch(search(term));
  };

  return (
    <>
      <View
        style={{
          height: 48,
          backgroundColor: colors.secondary,
        }}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <SearchBar onSearch={onSearch} />
        <Loading show={loading} />
        {books && <BookList books={books} />}
      </SafeAreaView>
    </>
  );
};

export default Search;
