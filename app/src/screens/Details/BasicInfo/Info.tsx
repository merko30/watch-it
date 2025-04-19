import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@shopify/restyle';

import { Box, Text, Theme } from '@/theme';

interface InfoProps {
  text: string | number;
  last?: boolean;
  icon?: string;
}

const Info = ({ text, last = false, icon }: InfoProps) => {
  const { colors } = useTheme<Theme>();
  return (
    <>
      <Box flexDirection="row" mr="m" alignItems="center">
        {icon && <Icon name={icon} size={18} color={colors.foreground} />}
        <Text
          color="foreground"
          ml={icon ? 's' : 0}
          fontWeight="700"
          fontSize={18}>
          {text}
        </Text>
      </Box>
      {!last && (
        <Box
          alignSelf="center"
          borderRadius="full"
          mr="m"
          width={10}
          height={10}
          bg="dark"
        />
      )}
    </>
  );
};

export default Info;
