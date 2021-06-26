import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import {snapPoint} from 'react-native-redash';
import Animated, {
  divide,
  useAnimatedGestureHandler,
  useSharedValue,
  withTiming,
  withSpring,
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {Book as BookI} from '../../types';

import {Box, Text} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import BookSlideIcon from './BookSlideIcon';

const {width: wWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  iconsContainer: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    height: '100%',
  },
});

const SNAP_POINTS = [-wWidth, -200, 0];

interface BookProps {
  book: BookI;
  last: boolean;
  onSwipe: () => void;
}

const Book = ({book, last, onSwipe}: BookProps) => {
  const navigation = useNavigation();
  const HEIGHT = 60;
  const translateX = useSharedValue(0);
  const width = useSharedValue(0);
  const right = useSharedValue(-200);
  const shouldRemove = useSharedValue<0 | 1>(0);

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {offsetX: number}
  >({
    onActive: (e, ctx) => {
      (translateX.value = ctx.offsetX + Math.min(e.translationX, 0)),
        (width.value = Math.abs(translateX.value));
      right.value = translateX.value;
    },
    onEnd: (e, ctx) => {
      const to = snapPoint(translateX.value, e.velocityX, SNAP_POINTS);
      translateX.value = withTiming(to, {
        duration: 500,
      });
      ctx.offsetX = translateX.value;
      if (to === -wWidth) {
        shouldRemove.value = 1;
      } else if (to === -200) {
        width.value = withSpring(210);
        right.value = -200;
      } else if (to === 0) {
        width.value = withTiming(0);
      }
    },
  });

  const height = useDerivedValue(() =>
    shouldRemove.value === 1 ? withTiming(0, {duration: 300}) : HEIGHT,
  );

  const style = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
    height: height.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    right: right.value,
  }));

  return (
    <PanGestureHandler {...gestureHandler} hitSlop={{right: 300}}>
      <Animated.View style={[style]}>
        <Box
          height="100%"
          backgroundColor="background"
          justifyContent="center"
          paddingLeft="m"
          position="relative"
          borderBottomColor="spacer"
          borderBottomWidth={last ? 0 : 1}>
          <Text color="foreground" variant="body">
            {book.title}
          </Text>
          <Animated.View style={[styles.iconsContainer, iconStyle]}>
            <BookSlideIcon
              backgroundColor="gray"
              style={{width: divide(width.value, 2)}}
              onPress={() => navigation.navigate('Details', {id: book.id})}
              icon="information-circle-outline"
            />
            <BookSlideIcon
              style={{width: divide(width.value, 2)}}
              onPress={() => (shouldRemove.value = 1)}
              icon="trash"
              backgroundColor="negative"
            />
          </Animated.View>
        </Box>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Book;
