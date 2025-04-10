import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
}

const RoundedIcon = ({ size, icon, onPress, style }: RoundedIconProps) => (
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
    <Icon name={icon} size={size / 1.6} />
  </TouchableOpacity>
);

export default RoundedIcon;
