import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
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

import Description from './Description';
import Info from './Info';
import Chip from 'components/Chip';
import { SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  poster: { aspectRatio: 6 / 9 },
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

  const { width } = useWindowDimensions();
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

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !movie) {
    return <Text>{error?.message}</Text>;
  }

  const formatDuration = (durationInMinutes: number) =>
    `${Math.round(durationInMinutes / 60)}h ${Math.round(
      durationInMinutes % 60,
    )}m`;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box backgroundColor="backgroundTwo" flex={1}>
        <Box flexDirection="row" m="s" width={width}>
          <Box flex={0.6} justifyContent="center">
            <MoviePoster style={styles.poster} uri={movie.poster_path} />
          </Box>
          <Box
            flex={0.4}
            px="l"
            alignItems="center"
            justifyContent="space-between">
            {movie.vote_average && (
              <Info
                icon="star"
                iconColor="gold"
                label="Rating"
                text={movie.vote_average}
              />
            )}
            {movie.runtime && (
              <Info
                icon="time"
                label="Duration"
                text={formatDuration(movie.runtime)}
              />
            )}
            {movie.release_date && (
              <Info
                icon="calendar"
                label="Released"
                text={movie.release_date}
              />
            )}
          </Box>
        </Box>
        <ScrollView
          contentContainerStyle={{
            borderRadius: borderRadii.m,
          }}
          showsVerticalScrollIndicator={false}>
          <Text
            variant="title"
            color="foreground"
            ellipsizeMode="tail"
            numberOfLines={2}>
            {movie.title}
          </Text>

          <Box my="s" flexDirection="row">
            {movie.genres.map(genre => (
              <Chip key={genre.id}>
                <Text>{genre.name}</Text>
              </Chip>
            ))}
          </Box>

          {movie.overview && <Description description={movie.overview} />}
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
};

export default Details;
