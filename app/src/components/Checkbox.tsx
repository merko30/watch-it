import React, { useEffect } from 'react';
import { useTheme } from '@shopify/restyle';

import { Box, Theme } from '../theme';
// import Animated, {
//   useCode,
//   cond,
//   set,
//   not,
//   eq,
//   onChange,
//   call,
//   interpolate,
// } from 'react-native-reanimated';
// import {
//   useValue,
//   useTapGestureHandler,
//   withTransition,
//   mixColor,
// } from 'react-native-redash';
// import { TapGestureHandler, State } from 'react-native-gesture-handler';
import {
  // processColor,
  View,
} from 'react-native';

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

const PADDING = 3;

const Checkbox = ({
  // checked,
  // onChange: change,
  size = Size.MEDIUM,
}: CheckboxProps) => {
  const {
    // colors,
    shadows,
  } = useTheme<Theme>();
  // const { gestureHandler, state } = useTapGestureHandler();
  // const trigger = useValue<0 | 1>(0);
  // const transition = withTransition(trigger, { duration: 200 });

  // useEffect(() => {
  //   if (checked) {
  //     trigger.setValue(1);
  //   }
  // }, []);

  // const color = mixColor(
  //   transition,
  //   processColor(colors.lightGray) as any,
  //   processColor(colors.positiveLight) as any,
  // ) as any as Animated.Node<string>;

  // const translateX = interpolate(transition, {
  //   inputRange: [0, 1],
  //   outputRange: [PADDING, size - PADDING],
  // });

  // useCode(
  //   () => [
  //     cond(eq(state, State.END), [set(trigger, not(trigger))]),

  //     onChange(
  //       trigger,
  //       call([trigger], ([triggered]) => {
  //         change(!!triggered);
  //       }),
  //     ),
  //   ],
  //   [state],
  // );

  return (
    <Box>
      <View
        style={{
          position: 'relative',
          width: size * 2,
          // backgroundColor: color,
          height: size + PADDING,
          borderRadius: size + PADDING / 2,
          justifyContent: 'center',
        }}>
        {/* <TapGestureHandler {...gestureHandler}> */}
        <View
          style={{
            // transform: [{ translateX }],
            backgroundColor: 'white',
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: size / 2,
            ...shadows.small,
          }}
        />
        {/* </TapGestureHandler> */}
      </View>
    </Box>
  );
};

export default Checkbox;
