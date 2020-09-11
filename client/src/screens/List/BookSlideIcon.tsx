import React from 'react';
import {StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

import {Theme, Box} from '../../theme';

interface BookSlideIconProps {
  icon: string;
  backgroundColor: keyof Theme['colors'];
  onPress: () => void;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  iconColor?: string;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

const BookSlideIcon = ({
  onPress,
  icon,
  backgroundColor,
  iconColor,
  style,
}: BookSlideIconProps) => {
  return (
    <AnimatedTouchableOpacity style={style} onPress={onPress}>
      <Box
        backgroundColor={backgroundColor}
        justifyContent="center"
        alignItems="center"
        height="100%">
        <Icon name={icon} size={24} color={iconColor} />
      </Box>
    </AnimatedTouchableOpacity>
  );
};

export default BookSlideIcon;
