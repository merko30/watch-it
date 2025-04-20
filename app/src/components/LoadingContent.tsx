import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import MaskedView from '@react-native-community/masked-view';

import theme from '../theme';
// { Theme }
// import { useTheme } from '@shopify/restyle';
// import { loop, mix } from 'react-native-redash';
// import Animated, {
//   useCode,
//   set,
//   Easing,
//   useValue,
// } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const LINE_WIDTH = width - theme.spacing.l;

const styles = StyleSheet.create({
  first: {
    height: 18,
    opacity: 0.2,
    width: LINE_WIDTH,
    backgroundColor: theme.colors.spacer,
    marginVertical: 10,
  },
  second: {
    backgroundColor: theme.colors.spacer,
    height: 18,
    opacity: 0.2,
    width: width - theme.spacing.xl,
    marginVertical: 10,
  },
});

interface LoadingContentProps {
  numOfLines: number;
}

// const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const LoadingContent = ({ numOfLines }: LoadingContentProps) => {
  // const trigger = useValue(0);
  // const { colors } = useTheme<Theme>();

  // useCode(
  //   () => [
  //     set(
  //       trigger,
  //       loop({
  //         duration: 2000,
  //         boomerang: true,
  //         autoStart: true,
  //         easing: Easing.linear,
  //       }),
  //     ),
  //   ],
  //   [],
  // );

  // const translateX = mix(trigger, -LINE_WIDTH, LINE_WIDTH);

  // const translate2X = mix(trigger, -LINE_WIDTH + 50, LINE_WIDTH);

  // const maskElement = (translateX: any) => (
  //   <AnimatedLinearGradient
  //     start={{ x: 0, y: 0.5 }}
  //     end={{ x: 1, y: 0.5 }}
  //     useAngle={true}
  //     angle={90}
  //     style={{
  //       ...StyleSheet.absoluteFillObject,
  //       transform: [{ translateX }],
  //     }}
  //     colors={[
  //       'red',
  //       'transparent',
  //       colors.error,
  //       'transparent',
  //       'transparent',
  //     ]}
  //   />
  // );

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      {new Array(numOfLines).fill(0).map((_, i) => {
        return (
          <View
            key={i}
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            {/* <MaskedView key={`${i}_1`} maskElement={maskElement(translateX)}> */}
            <View style={styles.first} />
            {/* </MaskedView> */}
            {/* <MaskedView key={`${i}_2`} maskElement={maskElement(translate2X)}> */}
            <View style={styles.first} />
            {/* </MaskedView> */}
          </View>
        );
      })}
    </View>
  );
};

export default LoadingContent;
