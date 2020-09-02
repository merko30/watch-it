import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import WebView from 'react-native-webview';

import {getBook, addOrUpdateBook, deleteBook} from '../../store/reducers/books';
import {statusesToShow} from '../../utils/menu';

import BookMenu from '../../components/BookMenu';

import {RootState} from '../../store/reducers';

import {BookStatus} from '../../types/Book';

import {RootStackParamList} from '../../navigation';

import theme from '../../theme';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: 'white',
    position: 'relative',
  },
  author: {
    fontSize: 20,
  },
  title: {
    color: theme.colors.primary,
    fontSize: 24,
    marginTop: 8,
  },
  image: {
    height: 240,
    width: width * 0.4,
  },
});

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const Details = ({
  route: {
    params: {id},
  },
}: DetailsProps) => {
  const dispatch = useDispatch();
  const {book, loading} = useSelector(
    ({books: {book, loading}}: RootState) => ({
      book,
      loading,
    }),
  );

  useEffect(() => {
    dispatch(getBook(id));
  }, []);

  const onMenuItemPress = (status: BookStatus | 'delete' | 'info') => {
    if (book) {
      if (status === 'delete') {
        dispatch(deleteBook(book.id));
      } else {
        if (status !== 'info') {
          dispatch(
            addOrUpdateBook({
              title: book.volumeInfo.title,
              thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
              authors: book.volumeInfo.authors,
              bookId: book.id,
              status,
            }),
          );
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {book ? (
        <ScrollView
          // style={{ flex: 1 }}
          contentContainerStyle={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          {book.volumeInfo.imageLinks && (
            <Image
              source={{
                uri:
                  book.volumeInfo.imageLinks.thumbnail ||
                  book.volumeInfo.imageLinks.smallThumbnail,
              }}
              resizeMode="contain"
              style={styles.image}
            />
          )}
          <BookMenu
            bookId={book.id}
            onPress={onMenuItemPress}
            containerStyle={{position: 'absolute', top: 10, right: 10}}
          />
          {book.volumeInfo.title && (
            <Text style={styles.title}>{book.volumeInfo.title}</Text>
          )}
          {book.volumeInfo.authors &&
            book.volumeInfo.authors.map((author) => {
              return (
                <Text style={styles.author} key={author}>
                  {author}
                </Text>
              );
            })}
          {book.volumeInfo.description && (
            <WebView
              // addLineBreaks={false}
              source={{
                html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>${book.volumeInfo.description}</body></html>`,
              }}
              style={{marginTop: 16}}
              scalesPageToFit
              javaScriptEnabled
              showsVerticalScrollIndicator={false}
            />
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default Details;
