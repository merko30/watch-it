import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';

import { Movie as MovieI } from '@/types';
import { Text, Theme } from '@/theme';
import { RootStackParamList } from '@/navigation';

import SlideIcon from './SlideIcon';

const { width: wWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  titleContainer: {
    width: wWidth,
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
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

const ICONS_WIDTH = -60;
const SNAP_POINTS = [-wWidth, ICONS_WIDTH, 0];

const getPosition = (value: number) => {
  'worklet';
  return withTiming(value, { duration: 300 });
};

const INITIAL_POSITION = 0;
interface MovieProps {
  movie: MovieI;
  last: boolean;
  onSwipe: () => void;
}

const Movie = ({ movie, last, onSwipe }: MovieProps) => {
  const { colors } = useTheme<Theme>();

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
        position.value = getPosition(ICONS_WIDTH);
      } else {
        position.value = getPosition(INITIAL_POSITION);
      }
    });

  const height = useDerivedValue(() =>
    shouldRemove.value === 1 ? withTiming(0, { duration: 300 }) : HEIGHT,
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
    height: height.value,
    zIndex: position.value > -50 ? 20 : -1,
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
    zIndex: position.value < -50 ? 30 : 0,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.container, animatedHeightStyle]}>
        <Animated.View
          style={[
            styles.titleContainer,
            {
              backgroundColor: colors.background,
              borderBottomColor: colors.spacer,
              borderBottomWidth: last ? 0 : 1,
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
          <SlideIcon onPress={onDelete} icon="trash" backgroundColor="error" />
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export default Movie;
