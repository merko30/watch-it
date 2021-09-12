import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
// import {
//   TapGestureHandler,
//   TapGestureHandlerGestureEvent,
// } from 'react-native-gesture-handler';
// import Animated, {
//   useAnimatedGestureHandler,
//   useAnimatedScrollHandler,
//   useSharedValue,
//   useDerivedValue,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
// import { ReText } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';
import { useQuery } from 'react-query';

import MovieList from './MovieList';

import theme, { Theme, Text, Box } from '../../theme';

import { getAll } from 'api/movies';
import { AxiosError, AxiosResponse } from 'axios';
import { Movie } from 'types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scene: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  row: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSizes.textLg,
    textTransform: 'uppercase',
  },
  showAll: {
    padding: 5,
    borderRadius: theme.borderRadii.s,
  },
});

const MOVIE_LSITS = [
  {
    name: 'wishlist',
    title: 'Wishlist',
    backgroundColor: 'orange',
  },
  {
    name: 'watching',
    title: 'Watching',
    backgroundColor: 'chocolate',
  },
  {
    name: 'watched',
    title: 'Watched',
    backgroundColor: 'brown',
  },
  {
    name: 'watch-again',
    title: 'Watch again',
    backgroundColor: 'brown',
  },
];

const Home = () => {
  const [movieLists] = useState(MOVIE_LSITS);
  const { colors } = useTheme<Theme>();

  const { data } = useQuery<
    AxiosResponse<{ movies: Movie[] }>,
    AxiosError,
    AxiosResponse<{ movies: Movie[] }>
  >('movies', getAll);

  const { movies = [] } = data?.data || {};

  // const y = useSharedValue(0);
  // const showAll = useSharedValue(0);

  // const marginTop = useDerivedValue(() => {
  //   return showAll.value === 1 ? 0 : -20;
  // });

  // const gestureHandler =
  //   useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
  //     onStart: () => {
  //       showAll.value = showAll.value ? 0 : 1;
  //     },
  //   });

  // const scrollHandler = useAnimatedScrollHandler({
  //   onScroll: e => {
  //     y.value = e.contentOffset.y;
  //   },
  // });

  // const text = useDerivedValue(() => {
  //   return showAll.value === 1 ? 'See less' : 'See more';
  // }, [showAll]);

  // const style = useAnimatedStyle(() => ({
  //   marginTop: marginTop.value,
  // }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.row}>
          <Text color="foreground" variant="body" style={styles.title}>
            Your lists
          </Text>
          {/* <TapGestureHandler onHandlerStateChange={gestureHandler}> */}
          <View>
            <Box backgroundColor="lightGray" p="xs" borderRadius="s">
              {/* <ReText */}
              {/* // text={text} */}
              {/* style={{ color: colors.gray, padding: 0 }}
                /> */}
            </Box>
          </View>
          {/* </TapGestureHandler> */}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // style={style}
          scrollEventThrottle={16}
          // {...scrollHandler}
        >
          {movieLists.map(list => {
            // const last = i === movieLists.length - 1;
            return (
              <MovieList
                // index={i}
                // showAll={showAll}
                // last={last}
                // y={y}
                movies={movies.filter(b => b.status === list.name)}
                {...list}
                name={list.name}
                title={list.title}
                key={list.name}
              />
            );
          })}
          {/* {JSON.stringify(movies)} */}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
