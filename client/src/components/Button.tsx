import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ColorValue,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
});

interface ButtonProps {
  onPress: () => void;
  color?: ColorValue;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  label: string;
  link?: boolean;
}

const Button = ({
  onPress,
  color: backgroundColor,
  containerStyle,
  textStyle,
  label,
  link,
}: ButtonProps) => {
  const paddingHorizontal = link ? 0 : 10;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {backgroundColor, paddingHorizontal},
        containerStyle,
      ]}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
