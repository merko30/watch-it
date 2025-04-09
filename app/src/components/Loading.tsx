import React from 'react';
import {View, ActivityIndicator, Dimensions, StyleSheet} from 'react-native';
import {Theme} from '../theme';
import {useTheme} from '@shopify/restyle';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'white',
    opacity: 0.7,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface LoadingProps {
  show: boolean;
}

const Loading = ({show}: LoadingProps) => {
  const {colors} = useTheme<Theme>();
  return show ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  ) : null;
};

export default Loading;
