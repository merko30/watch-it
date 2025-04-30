import React from 'react';
import { FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useTheme } from '@shopify/restyle';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../../navigation';

import Movie from './Movie';

import { Theme, Text } from '../../theme';

import capitalize from '../../utils/capitalize';
import { Movie as MovieI } from '@/types';
import { deleteMovie, getAll } from '@/api/movies';

const List = ({
  route: { params },
}: StackScreenProps<RootStackParamList, 'List'>) => {
  const { colors } = useTheme<Theme>();

  const { data, isLoading: loading } = useQuery<
    AxiosResponse<{ movies: MovieI[] }>,
    AxiosError,
    AxiosResponse<{ movies: MovieI[] }>
  >('movies', () => getAll({ status: params.status }));

  const { movies = [] } = data?.data || {};

  const { mutate } = useMutation<
    AxiosResponse<{ movie: MovieI }>,
    AxiosError<{ message: string }>,
    number
  >({
    mutationKey: 'deleteMovie',
    mutationFn: (id: number) => deleteMovie(id),
  });

  const onDelete = (item: MovieI) => mutate(item.id);

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
          {capitalize(params.status)} list
        </Text>
        {movies && (
          <FlatList
            // onRefresh={() => dispatch(getBooks({status: params.status}))}
            refreshing={loading}
            // data={books.filter((b) => b.status === params.status)}
            data={movies}
            contentContainerStyle={{ overflow: 'visible' }}
            keyExtractor={i => i.id.toString()}
            renderItem={({ item, index }) => {
              const last = index === movies.length - 1;
              return (
                <Movie
                  movie={item}
                  last={last}
                  onSwipe={() => onDelete(item)}
                />
              );
            }}
          />
        )}
        {loading && <ActivityIndicator size="large" />}
      </>
    </SafeAreaView>
  );
};

export default List;
