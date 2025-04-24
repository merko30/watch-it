import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

import MoviePoster from '@/components/MoviePoster';
import { BackIcon } from '@/components';

import { RootStackParamList } from 'navigation';

import { Theme, Box, Text } from '@/theme';

import { getSingleMovie, updateMovie, remove } from '@/api/movies';

import { Movie, MovieStatus, TMDBMovie } from 'types';

import StatusMenu from './StatusMenu';
import BasicInfo from './BasicInfo';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  poster: { aspectRatio: 6 / 9, height: 300, alignSelf: 'center', zIndex: 30 },
  genres: { justifyContent: 'center', flex: 1, marginTop: 10 },
  overview: {
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  backIcon: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  backdrop: {
    width,
    height: 400,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  overlay: {
    width,
    height: 400,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 20,
  },
  menu: {
    position: 'absolute',
    right: 20,
    zIndex: 100,
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

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateMovie,
    onSuccess: (newData: AxiosResponse<{ movie: Movie }>) => {
      queryClient
        .getQueryCache()
        .findAll()
        .filter(value => {
          const key = Array.isArray(value.queryKey)
            ? value.queryKey[0]
            : value.queryKey;
          return ['home-movies', 'movies'].includes(key);
        })
        .forEach(query => {
          queryClient.setQueriesData(
            [query.queryKey],
            (oldData?: AxiosResponse<{ movie: Movie; movies?: Movie[] }>) => {
              if (oldData?.data.movies) {
                if (
                  !oldData.data.movies.some(
                    movie => movie.id === newData.data.movie.id,
                  )
                ) {
                  return {
                    ...oldData,
                    data: {
                      ...oldData?.data,
                      movies: [...oldData.data.movies, newData.data.movie],
                    },
                  };
                }

                if (query.queryKey === 'home-movies') {
                  const movies = oldData?.data.movies?.map((movie: Movie) => {
                    if (movie.id === newData.data.movie.id) {
                      return {
                        ...movie,
                        status: newData.data.movie.status,
                      };
                    }
                    return movie;
                  });

                  return {
                    ...oldData,
                    data: {
                      ...oldData?.data,
                      movies,
                    },
                  };
                }

                const movies = oldData.data.movies.filter(
                  (movie: Movie) => movie.id !== newData.data.movie.id,
                );

                return {
                  ...oldData,
                  data: {
                    ...oldData?.data,
                    movies,
                  },
                };
              }

              if (!oldData) {
                return newData;
              }

              return {
                ...oldData,
                data: {
                  ...oldData?.data,
                  movie: {
                    ...oldData?.data.movie,
                    status: newData.data.movie.status,
                  },
                },
              };
            },
          );
        });
    },
  });

  const { mutate: deleteMovie } = useMutation({
    mutationFn: remove,
    onSuccess: () => {},
  });

  const onMenuItemPress = (status: MovieStatus | 'delete' | 'info') => {
    if (movie) {
      if (status === 'delete') {
        deleteMovie(movie.id);
      } else if (status === 'info') {
        navigation.navigate('Details', {
          id: movie.id,
          type: movie.media_type as 'movie' | 'tv',
        });
      } else {
        mutate({
          title: movie.title ?? movie.name,
          tmdbType: type,
          tmdbId: movie.id,
          image: movie.poster_path,
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
            color={colors.black}
            onPress={() => setShowMenu(previousValue => !previousValue)}
          />
        ),
      });
    }
  }, [movie, colors.black, spacing.m, navigation]);

  const height = useHeaderHeight();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !movie) {
    return (
      <Text>
        Failed to load {type === 'movie' ? 'movie' : 'tv show'} details
      </Text>
    );
  }

  if (movie) {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: height + 20,
            paddingHorizontal: spacing.l,
            backgroundColor: colors.background,
          },
        ]}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
          }}
          style={styles.backdrop}
        />
        <Box backgroundColor="black" opacity={0.5} style={styles.overlay} />
        <BackIcon
          onPress={() => navigation.goBack()}
          style={[
            styles.backIcon,
            {
              top: spacing.xxl,
              left: spacing.m,
            },
          ]}
        />
        <StatusMenu
          visible={showMenu}
          toggleVisible={() => setShowMenu(!showMenu)}
          movieId={movie.id}
          onUpdateStatus={onMenuItemPress}
          containerStyle={[
            styles.menu,
            {
              top: spacing.xxl,
            },
          ]}
        />

        <Box alignItems="center" pt="xl" bg="background">
          <MoviePoster style={styles.poster} uri={movie.poster_path} />
          <Text
            variant="title"
            color="foreground"
            fontWeight="700"
            ellipsizeMode="tail"
            numberOfLines={2}
            textAlign="center"
            style={{
              marginTop: 80,
            }}>
            {movie.title ?? movie.name}
          </Text>
          <BasicInfo movie={movie} />
        </Box>

        {movie.overview && (
          <Text py="l" textAlign="center" fontSize={16} color="foreground">
            {movie.overview}
          </Text>
        )}
      </ScrollView>
    );
  }

  return null;
};

export default Details;
