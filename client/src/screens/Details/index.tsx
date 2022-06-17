import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { useMutation, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

import MoviePoster from 'components/MoviePoster';

import { RootStackParamList } from 'navigation';

import { Theme, Box, Text } from 'theme';

import { getSingleMovie, addOrUpdateMovie, remove } from 'api/movies';

import { MovieStatus, TMDBMovie } from 'types';

import StatusMenu from './StatusMenu';
import BasicInfo from './BasicInfo';

const styles = StyleSheet.create({
  poster: { aspectRatio: 6 / 9, height: 300, alignSelf: 'center' },
  genres: { justifyContent: 'center', flex: 1, marginTop: 10 },
  overview: {
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
  },
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

  const { spacing, colors } = useTheme<Theme>();

  const { data, isLoading, error } = useQuery<
    AxiosResponse<{ volume: TMDBMovie }>,
    AxiosError<{ message: string }>
  >(['movie', { id, type }], () => getSingleMovie({ type, id }));

  const { data: { volume: movie = null } = {} } = data || {};

  const { mutate } = useMutation({
    mutationFn: addOrUpdateMovie,
  });

  const { mutate: deleteMovie } = useMutation({
    mutationFn: remove,
  });

  const onMenuItemPress = (status: MovieStatus | 'delete' | 'info') => {
    if (movie) {
      if (status === 'delete') {
        deleteMovie(movie.id);
      } else if (status === 'info') {
        navigation.navigate('Details', {
          id: movie.id.toString(),
          type: movie.media_type as 'movie' | 'tv',
        });
      } else {
        mutate({
          title: movie.title,
          poster_path: movie.poster_path,
          id: movie.id,
          status,
        });
      }
    }
  };

  useEffect(() => {
    if (movie) {
      navigation.setOptions({
        headerRight: () => (
          <Icon
            name="add-circle-outline"
            style={{ marginRight: spacing.m }}
            size={32}
            color={colors.foreground}
            onPress={() => setShowMenu(previousValue => !previousValue)}
          />
        ),
      });
    }
  }, [movie, colors.foreground, spacing.m, navigation]);

  const height = useHeaderHeight();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !movie) {
    return <Text>{error?.message}</Text>;
  }
  if (movie) {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: height,
            marginTop: spacing.m,
            paddingHorizontal: spacing.l,
          },
        ]}>
        <StatusMenu
          visible={showMenu}
          toggleVisible={() => setShowMenu(!showMenu)}
          movieId={movie.id}
          onPress={onMenuItemPress}
        />
        <Box alignItems="center">
          <MoviePoster style={styles.poster} uri={movie.poster_path} />
          <Text
            variant="title"
            color="foreground"
            fontWeight="700"
            ellipsizeMode="tail"
            numberOfLines={2}
            textAlign="center"
            mt="l">
            {movie.title}
          </Text>
          <BasicInfo movie={movie} />
        </Box>

        {movie.overview && (
          <Text py="l" textAlign="center" fontSize={16}>
            {movie.overview}
          </Text>
        )}
      </ScrollView>
    );
  }

  return null;
};

export default Details;
