import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';

import {BookCover, Rating} from '../../../components';

import {GoodreadsBook, Author} from '../../../types/Book';

import {Box, Text, Theme} from '../../../theme';

interface BookProps {
  book: Partial<GoodreadsBook> & {author: Author};
}

const IMAGE_RATIO = 0.7;

const Book = ({book}: BookProps) => {
  const {spacing, colors, borderRadii, shadows} = useTheme<Theme>();
  const {navigate} = useNavigation();

  console.log(book.average_rating);
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
          uri={book.image_url!}
          style={{borderRadius: borderRadii.m}}
          ratio={IMAGE_RATIO}
        />
        <Box marginLeft="m" flexShrink={1} width="100%">
          {book.title! && (
            <Text variant="subTitle" numberOfLines={2}>
              {book.title!}
            </Text>
          )}
          {book.average_rating && (
            <Rating
              style={{alignSelf: 'flex-end', marginTop: 'auto'}}
              rating={book.average_rating}
            />
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Book;
