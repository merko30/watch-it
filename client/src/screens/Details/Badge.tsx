import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: theme.borderRadii.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

interface BadgeProps {
  text: string;
  color?: string;
}

const Badge = ({ text }: BadgeProps) => {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
};

export default Badge;
