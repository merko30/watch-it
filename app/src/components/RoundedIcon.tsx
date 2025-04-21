import { useTheme } from '@shopify/restyle';
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Theme } from '@/theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

interface RoundedIconProps {
  icon: string;
  size: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  color?: keyof Theme['colors'];
}

const RoundedIcon = ({
  size,
  icon,
  onPress,
  style,
  color = 'primary',
}: RoundedIconProps) => {
  const { colors } = useTheme<Theme>();

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
            borderRadius: size / 2,
          },
        ]}
      />
      <Icon name={icon} size={size / 1.6} style={{ color: colors[color] }} />
    </TouchableOpacity>
  );
};

export default RoundedIcon;
