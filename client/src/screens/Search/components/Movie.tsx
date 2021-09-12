import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MoviePoster from 'components/MoviePoster';
import Rating from 'components/Rating';

import { TMDBMovie } from 'types/Movie';

import { Theme, Box, Text } from 'theme';
import { useTheme } from '@shopify/restyle';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation';
interface MovieProps {
  movie: TMDBMovie;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  rating: { alignSelf: 'flex-end', alignItems: 'flex-end', marginTop: 'auto' },
  poster: { aspectRatio: 6 / 9, height: 120 },
});

const Movie = ({ movie }: MovieProps) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { shadows, spacing, borderRadii } = useTheme<Theme>();

  const isMovie = movie.media_type === 'movie';
  const titleKey = isMovie ? 'title' : 'name';

  const navigateToDetails = () =>
    navigate('Details', {
      type: movie.media_type as 'movie' | 'tv',
      id: movie.id.toString(),
    });

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          ...shadows.medium,
          marginBottom: spacing.m,
          marginHorizontal: spacing.m,
          padding: spacing.s,
          borderRadius: borderRadii.m,
        },
      ]}
      onPress={navigateToDetails}>
      <Box flexDirection="row">
        <MoviePoster style={styles.poster} uri={movie.poster_path} />
        <Box marginLeft="m" flexShrink={1} width="100%">
          <Text variant="subTitle" numberOfLines={2}>
            {movie[titleKey]}
          </Text>
          {movie.vote_average && movie.vote_average !== 0 ? (
            <Rating style={styles.rating} rating={movie.vote_average} />
          ) : (
            <Text style={styles.rating}>Not rated</Text>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Movie;
