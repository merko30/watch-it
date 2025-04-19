import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';

import MoviePoster from '@/components/MoviePoster';
import Rating from '@/components/Rating';

import { TMDBMovie } from 'types/Movie';

import { Theme, Box, Text } from '@/theme';

import { RootStackParamList } from 'navigation';
interface MovieProps {
  movie: TMDBMovie;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  rating: { alignItems: 'flex-end', marginTop: 'auto', marginBottom: 0 },
  poster: { aspectRatio: 6 / 9, height: 120, maxHeight: 120, width: 80 },
});

const Movie = ({ movie }: MovieProps) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { shadows } = useTheme<Theme>();

  const isMovie = movie.media_type === 'movie';
  const titleKey = isMovie ? 'title' : 'name';

  const navigateToDetails = () =>
    navigate('Details', {
      type: movie.media_type as 'movie' | 'tv',
      id: movie.id,
    });

  return (
    <TouchableOpacity onPress={navigateToDetails}>
      <Box
        flexDirection="row"
        p="s"
        mb="m"
        mx="s"
        bg="white"
        borderRadius="m"
        {...shadows.small}
        shadowColor="black"
        backgroundColor="foreground">
        <MoviePoster style={styles.poster} uri={movie.poster_path} />
        <Box marginLeft="m" flexShrink={1} width="100%">
          <Text variant="body" numberOfLines={2}>
            {movie[titleKey]}
          </Text>
          {movie.vote_average && movie.vote_average !== 0 ? (
            <Rating
              style={styles.rating}
              rating={movie.vote_average.toFixed(1)}
            />
          ) : (
            <Text style={styles.rating}>Not rated</Text>
          )}
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default Movie;
