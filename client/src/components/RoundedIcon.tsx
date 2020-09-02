import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
  color: string;
}

const RoundedIcon = ({size, icon, onPress, color}: RoundedIconProps) => {
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
      ]}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: color,
          borderRadius: size / 2,

          opacity: 0.2,
        }}
      />
      <Icon name={icon} size={size / 1.6} color={color} />
    </TouchableOpacity>
  );
};

export default RoundedIcon;
