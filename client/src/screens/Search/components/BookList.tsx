import React from 'react';
import {FlatList} from 'react-native';

import Book from './Book';
import {GoogleBook} from '../../../types/Book';

interface BookListProps {
  books: GoogleBook[];
}

const BookList = ({books}: BookListProps) => {
  return (
    <FlatList
      style={{paddingHorizontal: 10}}
      data={books}
      renderItem={({item}) => <Book book={item} />}
      keyExtractor={(book) => book.id}
    />
  );
};

export default BookList;
