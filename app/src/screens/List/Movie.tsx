import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
// import { useNavigation } from '@react-navigation/native';

import { Movie as MovieI } from '@/types';

import { Box, Text } from '@/theme';

import BookSlideIcon from './BookSlideIcon';

const { width: wWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  iconsContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    height: '100%',
  },
});

const SNAP_POINTS = [-wWidth, -200, 0];

interface MovieProps {
  movie: MovieI;
  last: boolean;
  onSwipe: () => void;
}

// const END_POSITION = -200;

const Movie = ({ movie, last, onSwipe }: MovieProps) => {
  // const navigation = useNavigation();
  const HEIGHT = 60;
  const shouldRemove = useSharedValue<0 | 1>(0);
  const position = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      // goes to the left
      if (e.translationX < 0) {
        position.value = e.translationX;
      } else {
        // move to the start if user swipes right
        position.value = 0;
      }
    })
    .onEnd(() => {
      // handle swipe delete
      if (position.value < -wWidth / 2) {
        onSwipe();
        shouldRemove.value = 1;
        position.value = withTiming(-wWidth, { duration: 300 });
      }
    });

  const height = useDerivedValue(() =>
    shouldRemove.value === 1 ? withTiming(0, { duration: 300 }) : HEIGHT,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    height: height.value,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[animatedStyle]}>
        <Box
          height="100%"
          backgroundColor="backgroundThree"
          justifyContent="center"
          paddingLeft="m"
          paddingVertical="l"
          position="relative"
          borderBottomColor="spacer"
          borderBottomWidth={last ? 0 : 1}>
          <Text color="foreground" variant="body">
            {movie.title}
          </Text>
          <View
            style={[
              styles.iconsContainer,
              // iconStyle
            ]}>
            <BookSlideIcon
              backgroundColor="gray"
              // style={{ width: divide(width.value, 2) }}
              onPress={() => {}}
              // onPress={() => navigation.navigate('Details', { id: book.id })}
              icon="information-circle-outline"
            />
            <BookSlideIcon
              onPress={() => {}}
              // style={{ width: divide(width.value, 2) }}
              // onPress={() => (shouldRemove.value = 1)}
              icon="trash"
              backgroundColor="negative"
            />
          </View>
        </Box>
      </Animated.View>
    </GestureDetector>
  );
};

export default Movie;
