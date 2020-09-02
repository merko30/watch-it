import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {deleteBook, addOrUpdateBook} from '../../../store/actions';

import BookMenu from '../../../components/BookMenu';

import Authors from '../../../components/Authors';
import BookI, {BookStatus} from '../../../types/Book';

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.7,
    borderBottomColor: '#ededed',
    margin: 1,
    flex: 1,
    padding: 8,
  },
  author: {
    fontSize: 14,
  },
  titleStyle: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

interface BookProps {
  item: BookI;
}

const Book = ({item: book}: BookProps) => {
  const {navigate} = useNavigation();

  const dispatch = useDispatch();

  const onMenuPress = (status: BookStatus | 'info' | 'delete') => {
    if (status === 'info') {
      navigate('Details', {id: book.bookId});
    } else if (status === 'delete') {
      dispatch(deleteBook(book.bookId));
    } else if (status === 'reading' || 'read' || 'wishlist') {
      dispatch(addOrUpdateBook({...book, status}));
    }
  };

  return (
    <View>
      <View style={styles.outer}>
        <View>
          <Text style={styles.titleStyle}>{book.title}</Text>
          <Authors
            textStyle={styles.author}
            authors={book.authors}
            numberOfLines={1}
          />
        </View>
        <BookMenu
          showInfoItem={true}
          key={book.bookId}
          bookId={book.bookId}
          onPress={onMenuPress}
        />
      </View>
    </View>
  );
};

export default Book;
