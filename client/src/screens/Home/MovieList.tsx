import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { MoviePoster } from 'components';
import { RootStackParamList } from 'navigation';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  // ColorValue,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  // StyleSheet,
  // FlatList,
  // TouchableOpacity,
} from 'react-native';
// import Animated from 'react-native-reanimated';
import { Box, Text } from 'theme';
import { Movie } from 'types';
// {
//   useValue,
//   set,
//   not,
//   Extrapolate,
//   useAnimatedGestureHandler,
//   interpolateNode,
//   useAnimatedStyle,
//   useDerivedValue,
//   useSharedValue,
//   interpolate,
//   withSpring,
// } from 'react-native-reanimated';
// import {
//   TapGestureHandler,
//   TapGestureHandlerStateChangeEvent,
// } from 'react-native-gesture-handler';
// import {useNavigation} from '@react-navigation/native';

// import theme, {Text} from '../../../theme';

export const BOOKSHELF_HEIGHT = 320;
export const TITLE_HEIGHT = 35;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 60,
    height: 90,
  },
  bookList: {
    justifyContent: 'flex-start',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
});

interface MovieListProps {
  movies: any[];
  title: string;
  // backgroundColor: ColorValue;
  name: string;
  // showAll: Animated.SharedValue<number>;
  // index: number;
  // last: boolean;
  // y: Animated.SharedValue<number>;
}

// const INACTIVE_MARGIN = -BOOKSHELF_HEIGHT + 25;

const MovieList = ({
  title,
  // backgroundColor,
  // showAll,
  // index,
  movies,
  // last,
  name,
}: // y,
MovieListProps) => {
  const [snapToInterval, setSnapToInterval] = useState(0);
  const [moviesArray, setMoviesArray] = useState<Movie[][]>([]);
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const [gestureHandleActive, setGestureHandlerActive] = useState(true);
  // const open = useSharedValue(0);

  // const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerStateChangeEvent>(
  //   {
  //     onStart: () => {
  //       open.value = open.value ? withSpring(0) : withSpring(1);
  //     },
  //   },
  // );

  // const translateYInterpolation = interpolate(
  //   y.value,
  //   [0, 1],
  //   [0, -0.2 * index],
  //   Extrapolate.CLAMP,
  // );

  // const scaleInterpolation = interpolate(
  //   index,
  //   [0, 1, 2],
  //   [0.8, 0.9, 1],
  //   Extrapolate.CLAMP,
  // );

  const transformMovies = useCallback((moviesArr: Movie[]) => {
    const movieArrays: Movie[][] = [];

    for (var i = 0; i < moviesArr.length; i += 2) {
      movieArrays.push(moviesArr.slice(i, i + 2));
    }
    return movieArrays;
  }, []);

  useEffect(() => {
    setMoviesArray(transformMovies(movies));
  }, [movies, transformMovies, setMoviesArray]);

  // const translateY = useDerivedValue(() => {
  //   return showAll.value === 1
  //     ? withSpring(0)
  //     : withSpring(translateYInterpolation);
  // });

  // const scale = useDerivedValue(() => {
  //   return showAll.value === 1 ? withSpring(1) : withSpring(scaleInterpolation);
  // });

  // const marginBottom = useDerivedValue(() => {
  //   const marginBottomInterpolation = interpolate(
  //     open.value,
  //     [0, 1],
  //     [-BOOKSHELF_HEIGHT + TITLE_HEIGHT, 5],
  //     Extrapolate.CLAMP,
  //   );
  //   return showAll.value === 1 ? marginBottomInterpolation : INACTIVE_MARGIN;
  // }, [open.value, showAll.value]);

  // useEffect(() => {
  //   setGestureHandlerActive(!!showAll.value);
  // },[showAll]);

  const renderBook = (item: Movie[]) => {
    return (
      <Box alignItems="flex-start" my="m">
        {item[0] && (
          <MoviePoster
            style={styles.image}
            key={item[0]._id}
            uri={item[0].poster_path}
          />
        )}
        {item[1] && (
          <MoviePoster
            style={styles.image}
            key={item[1]._id}
            uri={item[1].poster_path}
          />
        )}
      </Box>
    );
  };

  // const style = useAnimatedStyle(() => ({
  //   backgroundColor,
  //   marginBottom: !last ? marginBottom.value : 0,
  //   transform: [{scale: scale.value}, {translateY: translateY.value}],
  // }));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* <TapGestureHandler
          onHandlerStateChange={gestureHandler}
          // enabled={gestureHandleActive}
        > */}
        <View>
          <Text color="foreground" variant="body" style={styles.title}>
            {title}
          </Text>
        </View>
        {/* </TapGestureHandler> */}
        <TouchableOpacity onPress={() => navigate('List', { shelf: name })}>
          <Text color="foreground" variant="body">
            Show all movies
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        onLayout={e => setSnapToInterval(e.nativeEvent.layout.width)}
        data={moviesArray}
        keyExtractor={item => item.map(i => i._id).join('')}
        horizontal
        snapToInterval={snapToInterval}
        contentContainerStyle={[
          styles.bookList,
          {
            width: snapToInterval * (moviesArray.length / 3),
          },
        ]}
        decelerationRate="fast"
        scrollEventThrottle={1}
        renderItem={({ item }) => renderBook(item)}
      />
    </View>
  );
};

export default MovieList;
