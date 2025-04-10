import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@shopify/restyle';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Text, Box, Theme } from '@/theme';
import Button from '@/theme/Button';

import { getAll } from '@/api/movies';

import { Movie } from 'types';

import MovieList from './MovieList';

import { MOVIE_LISTS } from './constants';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const Home = () => {
  const [movieLists] = useState(MOVIE_LISTS);

  const expanded = useSharedValue(false);

  const { spacing } = useTheme<Theme>();

  const { data } = useQuery<
    AxiosResponse<{ movies: Movie[] }>,
    AxiosError,
    AxiosResponse<{ movies: Movie[] }>
  >('movies', getAll);

  const { movies = [] } = data?.data || {};

  const onExpand = () => {
    expanded.value = !expanded.value;
  };

  const animatedStyles = useAnimatedProps(() => {
    return {
      contentContainerStyle: {
        marginTop: withSpring(expanded.value ? 10 : -20),
      },
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingHorizontal: spacing.s },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Box
          justifyContent="space-between"
          flexDirection="row"
          alignItems="center"
          mb="m">
          <Text variant="subtitle">Your lists</Text>
          <Button onPress={onExpand}>
            <Text variant="body">See all</Text>
          </Button>
        </Box>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          {...animatedStyles}>
          {movieLists.map((list, index, arr) => {
            return (
              <MovieList
                movies={movies.filter(b => b.status === list.name)}
                name={list.name}
                title={list.title}
                key={list.name}
                isLast={index === arr.length - 1}
                expanded={expanded}
                index={index}
              />
            );
          })}
        </Animated.ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
