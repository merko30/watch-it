import React from 'react';
import { useTheme } from '@shopify/restyle';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { Box, Theme } from '../theme';

export enum Size {
  SMALL = 15,
  MEDIUM = 25,
  LARGE = 30,
  EXTRA_LARGE = 45,
}

interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  size: Size;
}

const PADDING = 4;

const Checkbox = ({
  checked,
  onChange: change,
  size = Size.MEDIUM,
}: CheckboxProps) => {
  const { colors, shadows } = useTheme<Theme>();

  const checkedValue = useSharedValue(checked ? 1 : 0);

  const tapGesture = Gesture.Tap().onEnd(() => {
    checkedValue.value = checkedValue.value === 0 ? 1 : 0;
    runOnJS(change)(checkedValue.value === 1);
  });

  const style = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: withTiming(checkedValue.value === 0 ? 0 : size),
        },
      ],
    }),
    [checkedValue],
  );

  const backgroundStyle = useAnimatedStyle(
    () => ({
      backgroundColor:
        checkedValue.value === 0 ? colors.lightGray : colors.positive,
    }),
    [checkedValue],
  );

  return (
    <Box>
      <GestureDetector gesture={tapGesture}>
        <Animated.View
          style={[
            {
              position: 'relative',
              width: size * 2 + 1.5,
              height: size + PADDING,
              borderRadius: size + PADDING / 2,
              justifyContent: 'center',
            },
            backgroundStyle,
          ]}>
          <Animated.View
            style={[
              {
                backgroundColor: 'white',
                width: size,
                height: size,
                borderRadius: size / 2,
                ...shadows.small,
              },
              style,
            ]}
          />
        </Animated.View>
      </GestureDetector>
    </Box>
  );
};

export default Checkbox;
