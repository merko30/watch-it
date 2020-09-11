import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Authors, BookCover, Rating} from '../../../components';

import {GoogleBook} from '../../../types/Book';

import theme, {Box, Text, Theme} from '../../../theme';
import {useTheme} from '@shopify/restyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: theme.spacing.l,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadii.m,
    ...theme.shadows.small,
  },
  background: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: -1,
    minHeight: 90,
    backgroundColor: theme.colors.lightGray,
  },
  title: {
    color: theme.colors.dark,
    fontSize: theme.fontSizes.textLg,
    paddingRight: theme.spacing.m,
  },
  author: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.primary,
  },
});

interface BookProps {
  book: GoogleBook;
}

const IMAGE_RATIO = 0.6;

const Book = ({book}: BookProps) => {
  const {spacing} = useTheme<Theme>();
  const [width, setWidth] = useState(80);
  const {navigate} = useNavigation();

  useEffect(() => {
    if (book) {
      if (book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail) {
        Image.getSize(book.volumeInfo.imageLinks.thumbnail, (width) => {
          setWidth(width * IMAGE_RATIO);
        });
      }
    }
  }, [book]);

  return (
    <TouchableOpacity
      onPress={() => navigate('Details', {id: book.id})}
      style={styles.container}>
      {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? (
        <BookCover uri={book.volumeInfo.imageLinks.thumbnail} />
      ) : (
        <BookCover />
      )}
      <View style={styles.background}>
        <View
          style={{
            paddingTop: 8,
            paddingLeft: spacing.m * 2 + width,
          }}>
          <Box flexDirection="row">
            {book.volumeInfo.title && (
              <Text style={styles.title} numberOfLines={2}>
                {book.volumeInfo.title}
              </Text>
            )}
          </Box>
          {book.volumeInfo.authors && (
            <Authors
              numberOfLines={1}
              textStyle={styles.author}
              authors={book.volumeInfo.authors}
            />
          )}
          {book.volumeInfo.averageRating && (
            <Rating rating={book.volumeInfo.averageRating} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Book;
