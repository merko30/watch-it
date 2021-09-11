import { useTheme } from '@shopify/restyle';
import React, { useState } from 'react';
import { ColorValue, LayoutChangeEvent, StyleSheet } from 'react-native';

import { Box, Theme } from '../theme';

interface ChipProps {
  children: React.ReactNode;
  color?: ColorValue | keyof Theme['colors'];
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

  const { colors } = useTheme();

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
          backgroundColor:
            color in colors ? colors[color as keyof Theme['colors']] : color,
          borderRadius: width / 2,
        },
      ]}
      onLayout={onLayout}>
      {children}
    </Box>
  );
};

export default Chip;
