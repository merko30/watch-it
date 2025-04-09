import React from 'react';
import {TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@shopify/restyle';

import {Theme} from '../theme';

interface BackIconProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ViewStyle>;
  color?: string;
}

const BackIcon = ({onPress, style, iconStyle, color}: BackIconProps) => {
  const {spacing} = useTheme<Theme>();
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon
        name="chevron-back"
        style={[{marginLeft: spacing.s}, iconStyle]}
        size={32}
        color={color}
      />
    </TouchableOpacity>
  );
};

export default BackIcon;
