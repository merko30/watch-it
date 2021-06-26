import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';

import {BookCover, Rating} from '../../../components';

import {GoogleBook} from '../../../types/Book';

import {Box, Text, Theme} from '../../../theme';

interface BookProps {
  book: GoogleBook;
}

const IMAGE_RATIO = 0.7;

const Book = ({book}: BookProps) => {
  const {spacing, colors, borderRadii, shadows} = useTheme<Theme>();
  const {navigate} = useNavigation();

  const image = book.volumeInfo.imageLinks
    ? book.volumeInfo.imageLinks.smallThumbnail
    : undefined;

  return (
    <TouchableOpacity
      onPress={() => navigate('Details', {id: book.id})}
      style={{
        marginVertical: spacing.m,
        padding: spacing.m,
        backgroundColor: colors.backgroundThree,
        borderRadius: borderRadii.m,
        ...shadows.large,
        shadowColor: colors.gray,
      }}>
      <Box flexDirection="row">
        <BookCover
          uri={image}
          style={{borderRadius: borderRadii.m}}
          ratio={IMAGE_RATIO}
        />
        <Box marginLeft="m" flexShrink={1} width="100%">
          {book.volumeInfo && book.volumeInfo.title! && (
            <Text variant="subTitle" numberOfLines={2}>
              {book.volumeInfo.title!}
            </Text>
          )}
          {book.volumeInfo.averageRating && (
            <Rating
              style={{alignSelf: 'flex-end', marginTop: 'auto'}}
              rating={book.volumeInfo.averageRating}
            />
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Book;
