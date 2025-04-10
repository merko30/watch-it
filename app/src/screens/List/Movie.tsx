import React from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import { StaticParamList, useNavigation } from '@react-navigation/native';

import { Movie as MovieI } from '@/types';

import { Text } from '@/theme';

import BookSlideIcon from './BookSlideIcon';
import { RootStackParamList } from '@/navigation';

const { width: wWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 5,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
  },
  iconsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    height: '100%',
  },
});

const ICONS_WIDTH = -120;
const SNAP_POINTS = [-wWidth, ICONS_WIDTH, 0];

const INITIAL_POSITION = 0;
interface MovieProps {
  movie: MovieI;
  last: boolean;
  onSwipe: () => void;
}

// const END_POSITION = -200;

import type { StackNavigationProp } from '@react-navigation/stack';

const Movie = ({ movie, last, onSwipe }: MovieProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const HEIGHT = 60;
  const shouldRemove = useSharedValue<0 | 1>(0);
  const position = useSharedValue(INITIAL_POSITION);

  const onDelete = () => {
    onSwipe();
    shouldRemove.value = 1;
    position.value = withTiming(-wWidth, { duration: 300 });
  };

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      // goes to the left
      if (e.translationX < 0) {
        position.value = e.translationX;
      }
    })
    .onEnd(e => {
      // finds the closest snap point
      // to the current position
      const to = snapPoint(position.value, e.velocityX, SNAP_POINTS);
      // handle swipe delete
      if (to === -wWidth) {
        onDelete();
      } else if (to === ICONS_WIDTH) {
        position.value = withTiming(ICONS_WIDTH, { duration: 300 });
      }
    });

  const height = useDerivedValue(() =>
    shouldRemove.value === 1 ? withTiming(0, { duration: 300 }) : HEIGHT,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    height: height.value,
  }));

  const animatedHeightStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  const navigateToDetails = () => {
    navigation.navigate('Details', {
      id: movie.tmdbId,
      type: movie.tmdbType as 'movie' | 'tv',
    });
  };

  const iconsStyle = useAnimatedStyle(() => ({
    zIndex: position.value > -50 ? 10 : 0,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedHeightStyle]}>
        <Animated.View
          style={[
            styles.titleContainer,
            {
              width: wWidth,
            },
            animatedStyle,
          ]}>
          <TouchableOpacity onPress={navigateToDetails}>
            <Text color="foreground" variant="body" pl="m">
              {movie.title}
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.iconsContainer, iconsStyle]}>
          <BookSlideIcon
            onPress={navigateToDetails}
            backgroundColor="gray"
            icon="information-circle-outline"
          />
          <BookSlideIcon
            onPress={onDelete}
            icon="trash"
            backgroundColor="negative"
          />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default Movie;
