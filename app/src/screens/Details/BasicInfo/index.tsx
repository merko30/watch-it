import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {Box, Text} from '@/theme';

import {TMDBMovie} from 'types';

import Chip from '@/components/Chip';

import Info from './Info';

interface BasicInfoProps {
  movie: TMDBMovie;
}

const styles = StyleSheet.create({
  genres: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
});

const BasicInfo = ({movie}: BasicInfoProps) => {
  const formatDuration = (durationInMinutes: number) =>
    `${Math.round(durationInMinutes / 60)}h ${Math.round(
      durationInMinutes % 60,
    )}m`;

  return (
    <>
      <Box flexDirection="row" my="m" justifyContent="space-between">
        {movie.release_date && <Info text={movie.release_date.slice(0, 4)} />}
        {movie.vote_average && <Info icon="star" text={movie.vote_average} />}
        {movie.runtime && <Info last text={formatDuration(movie.runtime)} />}
      </Box>
      <ScrollView horizontal contentContainerStyle={styles.genres}>
        {movie.genres.map(genre => (
          <Chip color="secondary" key={genre.id}>
            <Text>{genre.name}</Text>
          </Chip>
        ))}
      </ScrollView>
    </>
  );
};

export default BasicInfo;
