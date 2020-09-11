import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
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
  divide,
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
  const {state, translation, velocity, gestureHandler} = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const height = useValue(HEIGHT);
  const width = useValue(0);
  const right = useValue(-200);
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
        cond(eq(to, -200), set(width, spring({to: 210, from: width}))),
        cond(eq(to, -200), set(right, -200)),
        cond(eq(to, 0), [set(width, timing({to: 0, from: width}))]),
      ]),

      cond(shouldRemove, [
        set(height, timing({from: HEIGHT, to: 0})),
        cond(not(clockRunning(clock)), call([], onSwipe)),
      ]),
    ],
    [],
  );

  return (
    <PanGestureHandler {...gestureHandler} hitSlop={{right: 300}}>
      <Animated.View
        style={[
          {
            height,
            transform: [{translateX}],
          },
        ]}>
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
          <Animated.View style={[styles.iconsContainer, {right}]}>
            <BookSlideIcon
              backgroundColor="gray"
              style={{width: divide(width, 2)}}
              onPress={() => navigation.navigate('Details', {id: book.bookId})}
              icon="information-circle-outline"
            />
            <BookSlideIcon
              style={{width: divide(width, 2)}}
              onPress={() => shouldRemove.setValue(1)}
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
