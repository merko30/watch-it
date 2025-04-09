import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSizes.titleXl,
    marginBottom: 10,
    fontFamily: 'Montserrat-SemiBold',
    color: theme.colors.primary,
  },
  background: {
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const Splash = () => {
  return (
    <View style={styles.background}>
      <Text style={styles.title}>Watch it</Text>
    </View>
  );
};

export default Splash;
