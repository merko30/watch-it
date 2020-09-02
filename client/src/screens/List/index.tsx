import React, {useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import Svg, {Path} from 'react-native-svg';
import {useTheme} from '@shopify/restyle';

import {RootStackParamList} from '../../navigation';

import {getBooks, deleteBook} from '../../store/reducers/books';

import {RootState} from '../../store/reducers';

import Book from './Book';
import theme, {Theme} from '../../theme';
import Header from './Header';
import CurveCorner from './CurveCorner';

const styles = StyleSheet.create({
  title: {
    paddingLeft: theme.spacing.m,
    fontSize: theme.fontSizes.title,
    marginVertical: theme.spacing.m,
    color: theme.colors.primary,
    fontWeight: '500',
  },
});

const List = ({
  route: {params},
  navigation,
}: StackScreenProps<RootStackParamList, 'List'>) => {
  const {colors} = useTheme<Theme>();
  const dispatch = useDispatch();
  const {books, error, loading} = useSelector(
    (state: RootState) => state.books,
  );

  useEffect(() => {
    dispatch(getBooks({status: params.shelf}));
  }, [params.shelf]);

  const onRefresh = () => {};

  const color = params.shelf as keyof Theme['colors'];
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        showBackIcon={true}
        title={params.shelf}
        backgroundColor={colors[color]}
      />
      <CurveCorner color={color} />
      <SafeAreaView
        style={{
          backgroundColor: colors[color],
          flex: 1,
        }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
          }}>
          {!loading && (
            <FlatList
              // onRefresh={() => getBooks({})}
              // refreshing={loading}
              data={books}
              contentContainerStyle={{overflow: 'visible'}}
              keyExtractor={(i) => i._id}
              renderItem={({item, index}) => {
                const last = index === books.length - 1;
                return (
                  <Book
                    book={item}
                    last={last}
                    onSwipe={() => dispatch(deleteBook(item.bookId))}
                  />
                );
              }}
            />
          )}
          {loading && <ActivityIndicator size="large" />}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default List;
