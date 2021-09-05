import React, { useState } from 'react';
import { ColorValue, LayoutChangeEvent, StyleSheet } from 'react-native';

import { Box } from '../theme';

interface ChipProps {
  children: React.ReactNode;
  color?: ColorValue;
}

const styles = StyleSheet.create({
  chip: {
    height: 40,
  },
});

const Chip = ({ children, color = 'red' }: ChipProps) => {
  const [width, setWidth] = useState(0);

  const onLayout = ({
    nativeEvent: {
      layout: { width: elementWidth },
    },
  }: LayoutChangeEvent) => {
    setWidth(elementWidth);
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      mr="s"
      px="s"
      style={[
        styles.chip,
        {
          // width,
          backgroundColor: color,
          borderRadius: width / 2,
        },
      ]}
      onLayout={onLayout}>
      {children}
    </Box>
  );
};

export default Chip;
