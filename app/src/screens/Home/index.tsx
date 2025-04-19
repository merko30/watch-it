import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: { flex: 1 },
});

const Home = () => {
  const [movieLists] = useState(MOVIE_LISTS);

  const expanded = useSharedValue(false);
  const verticalSpace = useSharedValue(20);

  const { spacing, colors } = useTheme<Theme>();

  const { data } = useQuery<
    AxiosResponse<{ movies: Movie[] }>,
    AxiosError,
    AxiosResponse<{ movies: Movie[] }>
  >('movies', getAll);

  const { movies = [] } = data?.data || {};

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (e.translationY > 0) {
        if (!expanded.value) {
          verticalSpace.value = 40;
        }
      }
    })
    .onEnd(() => {
      verticalSpace.value = 20;
    });

  const onExpand = () => (expanded.value = !expanded.value);

  const animatedStyles = useAnimatedProps(() => {
    return {
      contentContainerStyle: {
        marginTop: withSpring(expanded.value ? 10 : -20),
      },
    };
  });

  const scrollGesture = Gesture.Native(); // fallback for ScrollView

  const gesture = Gesture.Simultaneous(panGesture, scrollGesture);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingHorizontal: spacing.s },
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <GestureDetector gesture={gesture}>
          <View>
            <Box
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
              mb="s"
              pt="m">
              <Text variant="subtitle" color="foreground">
                Your lists
              </Text>
              <Button onPress={onExpand}>
                <Text variant="body" color="foreground">
                  See all
                </Text>
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
                    verticalSpace={verticalSpace}
                    index={index}
                  />
                );
              })}
            </Animated.ScrollView>
          </View>
        </GestureDetector>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
