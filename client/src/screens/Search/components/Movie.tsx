import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MoviePoster from 'components/MoviePoster';
import Rating from 'components/Rating';

import { TMDBMovie } from 'types/Movie';

import { Theme, Box, Text } from 'theme';
import Button from 'theme/Button';
import { useTheme } from '@shopify/restyle';
interface MovieProps {
  movie: TMDBMovie;
}

const styles = StyleSheet.create({
  rating: { alignSelf: 'flex-end', alignItems: 'flex-end', marginTop: 'auto' },
  poster: { aspectRatio: 6 / 9, height: 120 },
});

const Movie = ({ movie }: MovieProps) => {
  const { navigate } = useNavigation();
  const { shadows } = useTheme<Theme>();

  const isMovie = movie.media_type === 'movie';
  const titleKey = isMovie ? 'title' : 'name';

  return (
    <Button
      my="s"
      bg="lightGray"
      style={shadows.medium}
      borderRadius="m"
      onPress={() =>
        navigate('Details', { type: movie.media_type, id: movie.id })
      }>
      <Box flexDirection="row" p="s">
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
    </Button>
  );
};

export default Movie;