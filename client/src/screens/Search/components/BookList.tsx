import React from 'react';
import {
  // FlatList,
  View,
} from 'react-native';

// import Book from './Book';
import {TMDBMovie} from 'types/Movie';

interface MovieList {
  books: TMDBMovie[];
}

const MovieList = (_: MovieList) => {
  return (
    <View></View>
    // <FlatList
    //   style={{paddingHorizontal: 10}}
    //   data={books}
    //   renderItem={({item}) => <Book book={item} />}
    //   keyExtractor={book => book.id}
    // />
  );
};

export default MovieList;
