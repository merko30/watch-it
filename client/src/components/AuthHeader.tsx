import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackIcon from './BackIcon';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: theme.fontSizes.titleLg,
  },
  text: {
    fontSize: theme.fontSizes.textLg,
    color: theme.colors.primary,
  },
  icon: {
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 50,
    height: 50,
    ...theme.shadows.medium,
  },
});

interface AuthHeaderProps {
  title: string;
  text: string;
  back?: boolean;
}

const AuthHeader = ({title, text, back}: AuthHeaderProps) => {
  const {goBack} = useNavigation();
  return (
    <View style={styles.container}>
      {back && (
        <BackIcon
          iconStyle={{marginLeft: 0}}
          style={styles.icon}
          onPress={() => goBack()}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default AuthHeader;
