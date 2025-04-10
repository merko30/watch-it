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
import { useMutation, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

import MoviePoster from '@/components/MoviePoster';
import { BackIcon } from '@/components';

import { RootStackParamList } from 'navigation';

import { Theme, Box, Text } from '@/theme';

import { getSingleMovie, addOrUpdateMovie, remove } from '@/api/movies';

import { MovieStatus, TMDBMovie } from 'types';

import StatusMenu from './StatusMenu';
import BasicInfo from './BasicInfo';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  poster: { aspectRatio: 6 / 9, height: 300, alignSelf: 'center' },
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
    padding: 5,
    zIndex: 30,
  },
  backdrop: {
    width,
    height: 400,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: { width, height: 400, position: 'absolute', top: 0, left: 0 },
  menu: {
    position: 'absolute',
    top: 0,
    right: 10,
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
          id: movie.id,
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
            paddingTop: height,
            paddingHorizontal: spacing.l,
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
              top: spacing.xl,
              left: spacing.m,
            },
          ]}
        />
        <StatusMenu
          visible={showMenu}
          toggleVisible={() => setShowMenu(!showMenu)}
          movieId={movie.id}
          onPress={onMenuItemPress}
          containerStyle={styles.menu}
        />
        <Box alignItems="center" pt="xl">
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
