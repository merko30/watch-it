import React from 'react';
import { FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useTheme } from '@shopify/restyle';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../../navigation';

import Movie from './Movie';

import { Theme, Text } from '../../theme';

import capitalize from '../../utils/capitalize';
import { Movie as MovieI } from '@/types';
import { getAll } from '@/api/movies';

const List = ({
  route: { params },
}: StackScreenProps<RootStackParamList, 'List'>) => {
  const { colors } = useTheme<Theme>();

  const { data, isLoading: loading } = useQuery<
    AxiosResponse<{ movies: MovieI[] }>,
    AxiosError,
    AxiosResponse<{ movies: MovieI[] }>
  >('movies', getAll);

  const { movies = [] } = data?.data || {};

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
          {capitalize(params.shelf)} list
        </Text>
        {movies && (
          <FlatList
            // onRefresh={() => dispatch(getBooks({status: params.shelf}))}
            refreshing={loading}
            // data={books.filter((b) => b.status === params.shelf)}
            data={movies}
            contentContainerStyle={{ overflow: 'visible' }}
            keyExtractor={i => i._id}
            renderItem={({ item, index }) => {
              const last = index === movies.length - 1;
              return <Movie movie={item} last={last} onSwipe={console.log} />;
            }}
          />
        )}
        {loading && <ActivityIndicator size="large" />}
      </>
    </SafeAreaView>
  );
};

export default List;
