import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import WebView from 'react-native-webview';
import {useTheme} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';

import {getBook, addOrUpdateBook, deleteBook} from '../../store/reducers/books';

import BookMenu from './components/BookMenu';
import {BookCover} from '../../components';
import Info from './components/Info';

import {RootState} from '../../store/reducers';

import {BookStatus} from '../../types/Book';

import {RootStackParamList} from '../../navigation';

import theme, {Theme, Box, Text} from '../../theme';

import {book as bookPlaceholder} from '../../images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  row: {flexDirection: 'row'},
  scroll: {
    flex: 1,
    margin: theme.spacing.l,
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.l,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadii.m,
  },
  headerBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  info: {flexShrink: 1, marginLeft: 10},
  author: {
    fontSize: theme.fontSizes.text,
    color: theme.colors.gray,
  },
  title: {
    color: theme.colors.dark,
    fontSize: theme.fontSizes.titleM,
  },
  image: {
    height: 240,
    width: width * 0.4,
  },
  overview: {
    fontSize: theme.fontSizes.textLg,
    color: theme.colors.dark,
  },
  cover: {
    width,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 200,
  },
  content: {
    position: 'absolute',
    top: 100,
    flex: 1,
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
  const {top, bottom} = useSafeAreaInsets();
  const {spacing, colors, fontSizes} = useTheme<Theme>();
  const [showMenu, setShowMenu] = useState(false);
  const [loadingDescription, setLoadingDescription] = useState(true);
  const dispatch = useDispatch();
  const {book} = useSelector(({books: {book}}: RootState) => ({
    book,
  }));

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerRight: () => (
        <Icon
          name="add-circle-outline"
          style={{marginRight: spacing.m}}
          size={32}
          color={colors.white}
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
            title: book.volumeInfo.title,
            thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
            authors: book.volumeInfo.authors,
            bookId: book.id,
            status,
          }),
        );
      }
    }
  };

  return (
    <Box
      flex={1}
      backgroundColor="background"
      style={{paddingTop: top, paddingBottom: bottom}}>
      <StatusBar barStyle="light-content" />
      {book ? (
        <>
          <Image
            style={{
              ...StyleSheet.absoluteFillObject,
              width,
              height,
            }}
            defaultSource={bookPlaceholder}
            source={{uri: book.volumeInfo.imageLinks.extraLarge}}
          />
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {backgroundColor: 'rgba(0,0,0,0.7)'},
            ]}
          />
          <ScrollView
            // style={{ flex: 1 }}
            contentContainerStyle={[
              styles.scroll,
              {backgroundColor: colors.background},
            ]}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}>
            <BookMenu
              toggleVisible={() => setShowMenu(!showMenu)}
              visible={showMenu}
              bookId={book.id}
              onPress={onMenuItemPress}
            />
            <Box
              backgroundColor="lightGray"
              marginTop="l"
              marginHorizontal="l"
              padding="m"
              borderRadius="m">
              <Box flexDirection="row">
                {book.volumeInfo.imageLinks && (
                  <BookCover
                    ratio={0.8}
                    uri={book.volumeInfo.imageLinks.thumbnail!}
                  />
                )}
                <View style={styles.info}>
                  {book.volumeInfo.title && (
                    <Text
                      style={styles.title}
                      ellipsizeMode="tail"
                      numberOfLines={2}>
                      {book.volumeInfo.title}
                    </Text>
                  )}
                  {book.volumeInfo.authors &&
                    book.volumeInfo.authors.map((author) => {
                      return (
                        <Text style={styles.author} key={author}>
                          {author}
                        </Text>
                      );
                    })}
                </View>
              </Box>
            </Box>
            <View style={{paddingHorizontal: spacing.m, flex: 1}}>
              <View style={styles.headerBottom}>
                {book.volumeInfo.averageRating && (
                  <Info
                    icon="star"
                    iconColor="gold"
                    label="Rating"
                    text={book.volumeInfo.averageRating}
                  />
                )}
                {book.volumeInfo.pageCount && (
                  <Info
                    icon="book-outline"
                    iconColor="foreground"
                    label="Pages"
                    text={book.volumeInfo.pageCount}
                  />
                )}
              </View>
              {book.volumeInfo.description && (
                <View
                  style={{
                    marginTop: 24,
                    flex: 1,
                  }}>
                  <Text color="foreground" fontSize={fontSizes.textLg}>
                    Overview
                  </Text>
                  <WebView
                    style={{backgroundColor: colors.background}}
                    containerStyle={{
                      marginTop: spacing.m,
                      backgroundColor: colors.background,
                    }}
                    // addLineBreaks={false}
                    source={{
                      html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{background-color: ${colors.background};color:${colors.foreground};font-size:18;font-family:sans-serif;}</style></head><body>${book.volumeInfo.description}</body></html>`,
                    }}
                    scalesPageToFit
                    javaScriptEnabled
                    showsVerticalScrollIndicator={false}
                    onLoad={() => setLoadingDescription(false)}
                  />
                  {loadingDescription && (
                    <Box
                      flex={1}
                      alignItems="center"
                      backgroundColor="background">
                      <ActivityIndicator size="large" />
                    </Box>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </Box>
  );
};

export default Details;
