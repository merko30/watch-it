import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Theme, Box } from '@/theme';

interface BookSlideIconProps {
  icon: string;
  backgroundColor: keyof Theme['colors'];
  onPress: () => void;
  iconColor?: string;
}

// const AnimatedTouchableOpacity =
// Animated.createAnimatedComponent(TouchableOpacity);

const BookSlideIcon = ({
  onPress,
  icon,
  backgroundColor,
  iconColor,
}: BookSlideIconProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: '100%',
        width: 60,
      }}>
      <Box
        backgroundColor={backgroundColor}
        justifyContent="center"
        alignItems="center"
        height="100%">
        <Icon name={icon} size={24} color={iconColor} />
      </Box>
    </TouchableOpacity>
  );
};

export default BookSlideIcon;
