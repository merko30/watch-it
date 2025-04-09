import React from 'react';
import {StyleSheet} from 'react-native';
import {BoxProps} from '@shopify/restyle';

import {Box, Theme} from '@/theme';

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
});

const Info = (props: BoxProps<Theme>) => {
  return (
    <Box style={styles.divider} my="l" backgroundColor="gray" {...props} />
  );
};

export default Info;
