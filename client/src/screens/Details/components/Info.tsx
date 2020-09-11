import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import theme, {Theme} from '../../../theme';
import {useTheme} from '@shopify/restyle';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  textContainer: {flexDirection: 'row', alignItems: 'center'},
  text: {
    marginLeft: 8,
    fontSize: theme.fontSizes.textLg,
  },
  label: {
    fontSize: theme.fontSizes.textLg,
  },
});

interface InfoProps {
  label: string;
  text: string | number;
  icon?: string;
  textColor?: keyof Theme['colors'];
  iconColor?: keyof Theme['colors'];
}

const Info = ({
  icon,
  label,
  text,
  iconColor = 'foreground',
  textColor: color = 'foreground',
}: InfoProps) => {
  const {colors} = useTheme<Theme>();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: colors[color]}]}>{label}</Text>
      <View style={styles.textContainer}>
        {icon && <Icon name={icon} size={24} color={colors[iconColor]} />}
        <Text style={[styles.text, {color: colors[color]}]}>{text}</Text>
      </View>
    </View>
  );
};

export default Info;
