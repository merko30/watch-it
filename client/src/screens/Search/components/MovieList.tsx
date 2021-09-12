import React from 'react';
import { FlatList } from 'react-native';

import { TMDBMovie } from 'types/Movie';

import Movie from './Movie';

interface MovieListProps {
  movies: TMDBMovie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => <Movie movie={item} />}
      keyExtractor={movie => movie.id.toString()}
    />
  );
};

export default MovieList;
