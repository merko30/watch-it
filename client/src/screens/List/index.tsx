import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from '../../navigation';

import {getBooks, deleteBook} from '../../store/reducers/books';
import {RootState} from '../../store/reducers';

import Book from './Book';

import {Theme, Text} from '../../theme';

import capitalize from '../../utils/capitalize';
import {useTheme} from '@shopify/restyle';

const List = ({
  route: {params},
}: StackScreenProps<RootStackParamList, 'List'>) => {
  const dispatch = useDispatch();
  const {books, loadings} = useSelector((state: RootState) => state.books);
  const {colors} = useTheme<Theme>();

  useEffect(() => {
    dispatch(getBooks({status: params.shelf}));
  }, [params.shelf]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}>
      <>
        <Text
          paddingLeft="m"
          variant="header"
          marginVertical="m"
          color="secondary"
          fontWeight="600">
          {capitalize(params.shelf)} bookshelf
        </Text>
        {books && !loadings.common && (
          <FlatList
            onRefresh={() => dispatch(getBooks({status: params.shelf}))}
            refreshing={loadings['common']}
            data={books.filter((b) => b.status === params.shelf)}
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
        {loadings.common && <ActivityIndicator size="large" />}
      </>
    </SafeAreaView>
  );
};

export default List;
