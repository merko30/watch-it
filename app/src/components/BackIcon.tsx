import React from 'react';
import { TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BackIconProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  color?: string;
}

const BackIcon = ({ onPress, style, iconStyle, color }: BackIconProps) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Icon name="chevron-back" style={iconStyle} size={32} color={color} />
  </TouchableOpacity>
);

export default BackIcon;
