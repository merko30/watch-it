import React from 'react';
import { Dimensions, View } from 'react-native';

import { Box } from '../../theme';

const { width } = Dimensions.get('window');

interface LoadingContentProps {
  numOfLines: number;
}

const LoadingContent = ({ numOfLines }: LoadingContentProps) => (
  <View style={{ flex: 1, alignItems: 'center' }}>
    {new Array(numOfLines).fill(0).map((_, i) => {
      return (
        <Box
          key={i}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap="m"
          width={width - 20}
          marginBottom="m">
          <Box
            width={30}
            height={30}
            backgroundColor="spacer"
            borderRadius="full"
          />
          <Box height={40} width={width - 100} backgroundColor="spacer" />
        </Box>
      );
    })}
  </View>
);

export default LoadingContent;
