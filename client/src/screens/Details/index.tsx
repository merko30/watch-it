import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

// import {MovieStatus} from 'types/Movie';

import MoviePoster from 'components/MoviePoster';

import { RootStackParamList } from '../../navigation';

import { Theme, Box, Text } from '../../theme';

import { getSingleMovie } from 'api/movies';

import { TMDBMovie } from 'types';

import Chip from 'components/Chip';

import Description from './Description';
import Info from './Info';

const styles = StyleSheet.create({
  poster: { aspectRatio: 6 / 9, height: 300 },
  genres: { justifyContent: 'center', flex: 1, marginTop: 10 },
});

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type DetailsProps = {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
};

const Details = ({
  route: {
    params: { id, type },
  },
  navigation,
}: DetailsProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const { colors, borderRadii, spacing } = useTheme<Theme>();

  const { data, isLoading, error } = useQuery<
    AxiosResponse<{ volume: TMDBMovie }>,
    AxiosError<{ message: string }>
  >(['movie', { id, type }], () => getSingleMovie({ type, id }));
  const { data: { volume: movie = null } = {} } = data || {};

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="add-circle-outline"
          style={{ marginRight: spacing.m }}
          size={32}
          color={colors.foreground}
          onPress={() => setShowMenu(!showMenu)}
        />
      ),
    });
  }, [colors.foreground, spacing.m, navigation, showMenu]);

  // const onMenuItemPress = (status: MovieStatus | 'delete' | 'info') => {
  //   if (book) {
  //     if (status === 'delete') {
  //       dispatch(deleteBook(book.id));
  //     } else if (status == 'info') {
  //       navigation.navigate('Details', {id: book.id});
  //     } else {
  //       dispatch(
  //         addOrUpdateBook({
  //           title: movie.title,
  //           thumbnail: movie.imageLinks
  //             ? movie.imageLinks.smallThumbnail
  //             : undefined,
  //           authors: movie.authors,
  //           id: book.id,
  //           status,
  //         }),
  //       );
  //     }
  //   }
  // };
  const formatDuration = (durationInMinutes: number) =>
    `${Math.round(durationInMinutes / 60)}h ${Math.round(
      durationInMinutes % 60,
    )}m`;

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !movie) {
    return <Text>{error?.message}</Text>;
  }
  if (movie) {
    return (
      <Box flex={1} mt="m">
        <Box alignItems="center">
          <MoviePoster style={styles.poster} uri={movie.poster_path} />
          <Text
            variant="title"
            color="foreground"
            fontWeight="700"
            ellipsizeMode="tail"
            numberOfLines={2}
            mt="l">
            {movie.title}
          </Text>
          <Box flexDirection="row" my="m" justifyContent="space-between">
            {movie.release_date && (
              <Info text={movie.release_date.slice(0, 4)} />
            )}
            {movie.vote_average && (
              <Info icon="star" text={movie.vote_average} />
            )}
            {movie.runtime && (
              <Info last text={formatDuration(movie.runtime)} />
            )}
          </Box>
          <ScrollView horizontal contentContainerStyle={styles.genres}>
            {movie.genres.map(genre => (
              <Chip color="lightgray" key={genre.id}>
                <Text>{genre.name}</Text>
              </Chip>
            ))}
          </ScrollView>
        </Box>
        <ScrollView
          contentContainerStyle={{
            borderRadius: borderRadii.m,
          }}
          showsVerticalScrollIndicator={false}>
          {movie.overview && <Description description={movie.overview} />}
        </ScrollView>
      </Box>
    );
  }

  return null;
};

export default Details;
