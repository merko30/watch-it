import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Theme} from '../theme';
import {useTheme} from '@shopify/restyle';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface RoundedIconProps {
  icon: string;
  size: number;
  onPress?: () => void;
  color: keyof Theme['colors'];
  style?: StyleProp<ViewStyle>;
  backdropStyle?: StyleProp<ViewStyle>;
}

const RoundedIcon = ({
  size,
  icon,
  onPress,
  color,
  style,
  backdropStyle,
}: RoundedIconProps) => {
  const {colors} = useTheme<Theme>();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}>
      <View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors[color],
            borderRadius: size / 2,

            opacity: 0.2,
          },
          backdropStyle,
        ]}
      />
      <Icon name={icon} size={size / 1.6} color={colors[color]} />
    </TouchableOpacity>
  );
};

export default RoundedIcon;
