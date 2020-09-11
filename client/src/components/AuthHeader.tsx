import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import BackIcon from './BackIcon';

import theme, {Text} from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadii.xl,
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
      <Text variant="header" color="foreground">
        {title}
      </Text>
      <Text variant="body" color="secondary">
        {text}
      </Text>
    </View>
  );
};

export default AuthHeader;
