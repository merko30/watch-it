import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Platform,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import WebView from 'react-native-webview';
import {useTheme} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import {getBook, addOrUpdateBook, deleteBook} from '../../store/reducers/books';

import {BookMenu, Info} from './components';
import {BookCover} from '../../components';

import {RootState} from '../../store/reducers';

import {BookStatus} from '../../types/Book';

import {RootStackParamList} from '../../navigation';

import theme, {Theme, Box, Text} from '../../theme';
import {navigate} from 'src/utils/navigation';

const styles = StyleSheet.create({
  cover: {
    borderRadius: theme.borderRadii.m,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    ...Platform.select({
      android: {
        elevation: 6,
      },
    }),
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
  navigation,
  route: {
    params: {id},
  },
}: DetailsProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [height, setHeight] = useState(200);
  const [flatlistWidth, setFlatListWidth] = useState(0);

  const {spacing, colors, borderRadii} = useTheme<Theme>();
  const [loadingDescription, setLoadingDescription] = useState(true);
  const dispatch = useDispatch();
  const {book} = useSelector(({books: {book}}: RootState) => ({
    book,
  }));

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="add-circle-outline"
          style={{marginRight: spacing.m}}
          size={32}
          color={colors.foreground}
          onPress={() => setShowMenu(!showMenu)}
        />
      ),
    });
    dispatch(getBook(id));
  }, [id]);

  const onMenuItemPress = (status: BookStatus | 'delete' | 'info') => {
    if (book) {
      if (status === 'delete') {
        dispatch(deleteBook(book.id));
      } else if (status == 'info') {
        navigation.navigate('Details', {id: book.id});
      } else {
        dispatch(
          addOrUpdateBook({
            title: book.title,
            thumbnail: book.image_url,
            authors: book.authors.map((b) => b.name),
            id: book.id,
            status,
          }),
        );
      }
    }
  };

  return book ? (
    <Box backgroundColor="backgroundTwo" flex={1}>
      <LinearGradient
        colors={[colors.backgroundThree, colors.backgroundTwo]}
        style={{flexGrow: 1, paddingTop: spacing.l}}>
        <BookMenu
          toggleVisible={() => setShowMenu(!showMenu)}
          visible={showMenu}
          bookId={book.id}
          onPress={onMenuItemPress}
        />
        <Box marginHorizontal="l" alignItems="center" borderRadius="m">
          {book?.image_url && (
            <BookCover
              style={[
                styles.cover,
                {
                  shadowColor: colors.foreground,
                },
              ]}
              ratio={1.4}
              uri={book.image_url!}
            />
          )}
        </Box>
      </LinearGradient>
      <Box
        backgroundColor="background"
        flex={16}
        padding="xl"
        borderTopRightRadius="xxl"
        borderTopLeftRadius="xxl">
        <ScrollView
          contentContainerStyle={{
            borderRadius: borderRadii.m,
            backgroundColor: colors.background,
          }}
          style={{flexGrow: 2}}
          showsVerticalScrollIndicator={false}>
          {book.title && (
            <Text
              variant="title"
              color="foreground"
              ellipsizeMode="tail"
              numberOfLines={2}>
              {book.title}
            </Text>
          )}
          {book.authors &&
            book.authors.map((author) => {
              return (
                <Text variant="subTitle" color="foregroundTwo" key={author.id}>
                  {author.name}
                </Text>
              );
            })}
          <Box
            backgroundColor="backgroundTwo"
            borderRadius="m"
            marginTop="m"
            flexDirection="row"
            justifyContent="space-around">
            {book.average_rating && (
              <Info
                icon="star"
                iconColor="gold"
                label="Rating"
                text={book.average_rating}
              />
            )}
            {book.num_pages && (
              <Info
                icon="book-outline"
                iconColor="foreground"
                label="Pages"
                text={book.num_pages}
              />
            )}
          </Box>
          {book.description && (
            <Box marginVertical="m" flex={1} minHeight={250}>
              <Text color="foreground" variant="subTitle">
                Overview
              </Text>

              <AutoHeightWebView
                onSizeUpdated={(size) => setHeight(size.height)}
                // addLineBreaks={false}
                source={{
                  html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>html{height:${height}px;}body{height:${height}px;background-color: ${colors.background};color:${colors.foreground};font-size:18;font-family:sans-serif;}</style></head><body>${book.description}</body></html>`,
                }}
                style={{
                  width: '100%',
                  marginVertical: spacing.l,
                  height: '100%',
                }}
                scalesPageToFit
                javaScriptEnabled
                showsVerticalScrollIndicator={false}
                onLoad={() => setLoadingDescription(false)}
              />
              {loadingDescription && (
                <Box flex={1} alignItems="center" backgroundColor="background">
                  <ActivityIndicator size="large" color={colors.foreground} />
                </Box>
              )}
            </Box>
          )}
          <Box marginTop="m">
            <Text variant="subTitle" fontWeight="bold" marginBottom="l">
              Similar books
            </Text>

            <FlatList
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
              data={book.similar_books.book}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={flatlistWidth}
              decelerationRate="fast"
              scrollEventThrottle={16}
              onLayout={(e) => setFlatListWidth(e.nativeEvent.layout.width)}
              renderItem={({item}) => (
                <BookCover
                  onPress={() => navigation.navigate('Details', {id: item.id!})}
                  style={[
                    styles.cover,
                    {
                      marginRight: spacing.xl,
                    },
                  ]}
                  uri={item.image_url}
                  ratio={1}
                />
              )}
            />
          </Box>
        </ScrollView>
      </Box>
    </Box>
  ) : (
    <Box flex={1} justifyContent="center" backgroundColor="backgroundTwo">
      <ActivityIndicator color={colors.foreground} size="large" />
    </Box>
  );
};

export default Details;
