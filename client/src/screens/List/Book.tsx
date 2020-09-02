import React from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {
  usePanGestureHandler,
  useValue,
  timing,
  useClock,
  snapPoint,
  spring,
} from 'react-native-redash';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  add,
  min,
  call,
  not,
  clockRunning,
  abs,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import BookI from '../../types/Book';

import theme from '../../theme';

const {width: wWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingLeft: theme.spacing.m,
    borderBottomColor: theme.colors.gray,
    width: wWidth,
    position: 'relative',
  },
  removeButton: {
    backgroundColor: theme.colors.negative,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    height: '100%',
  },
});

const SNAP_POINTS = [-wWidth, -100, 0];

interface BookProps {
  book: BookI;
  last: boolean;
  onSwipe: () => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

const Book = ({book, last, onSwipe}: BookProps) => {
  const HEIGHT = 60;
  const {state, translation, velocity, gestureHandler} = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const height = useValue(HEIGHT);
  const width = useValue(0);
  const right = useValue(-100);
  const shouldRemove = useValue<0 | 1>(0);
  const clock = useClock();
  const to = snapPoint(translateX, velocity.x, SNAP_POINTS);

  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(translateX, add(offsetX, min(translation.x, 0))),
        set(width, abs(translateX)),
        set(right, translateX),
      ]),
      cond(eq(state, State.END), [
        set(translateX, timing({clock, to, from: translateX})),
        set(offsetX, translateX),
        cond(eq(to, -wWidth), set(shouldRemove, 1)),
        cond(eq(to, -100), set(width, spring({to: 100, from: width}))),
        cond(eq(to, -100), set(right, -100)),
      ]),
      cond(shouldRemove, [
        set(height, timing({from: HEIGHT, to: 0})),
        cond(not(clockRunning(clock)), call([], onSwipe)),
      ]),
    ],
    [],
  );

  return (
    <PanGestureHandler {...gestureHandler} hitSlop={{left: -200}}>
      <Animated.View
        style={[
          styles.container,
          {
            borderBottomWidth: last ? 0 : 1,
            height,
            transform: [{translateX}],
          },
        ]}>
        <Text>{book.title}</Text>
        <AnimatedTouchableOpacity
          style={[styles.removeButton, {width, right}]}
          onPress={() => shouldRemove.setValue(1)}>
          <Icon name="trash" size={24} />
        </AnimatedTouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Book;
