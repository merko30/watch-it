import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';

import theme, {Theme} from '../theme';

interface MessageProps {
  message: string;
  variant: 'positive' | 'negative';
}

const Message = ({message, variant}: MessageProps) => {
  const {colors, fontSizes} = useTheme<Theme>();
  const color = colors[variant as keyof Theme['colors']];
  const icon = variant == 'negative' ? 'close-circle' : 'checkmark-circle';
  const backgroundColor = variant == 'negative' ? 'pink' : 'lightgreen';
  return message ? (
    <View style={[styles.container, {backgroundColor}]}>
      <Icon name={icon} color={color} size={24} />
      <Text style={[styles.message, {color, fontSize: fontSizes.text}]}>
        {message}
      </Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    marginBottom: 10,
    borderRadius: theme.borderRadii.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  message: {
    fontWeight: '600',
    padding: 10,
  },
});

export default Message;
