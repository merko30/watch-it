import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

import theme, {Theme} from '../theme';
import {useTheme} from '@shopify/restyle';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadii.m,
    paddingVertical: 10,
  },
  buttonText: {
    color: theme.colors.background,
  },
});

interface ButtonProps {
  onPress: () => void;
  color?: keyof Theme['colors'];
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  link?: boolean;
  loading?: boolean;
  label: string;
}
const Button = ({
  onPress,
  color: backgroundColor = 'positive',
  containerStyle,
  textStyle,
  label,
  loading,
  link,
}: ButtonProps) => {
  const {colors} = useTheme<Theme>();
  const paddingHorizontal = link ? 0 : 10;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {backgroundColor: colors[backgroundColor], paddingHorizontal},
        containerStyle,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color="gray" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
