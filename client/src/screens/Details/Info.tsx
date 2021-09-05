import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Box, Theme, Text } from '../../theme';
import { useTheme } from '@shopify/restyle';

interface InfoProps {
  label: string;
  text: string | number;
  icon?: string;
  iconColor?: keyof Theme['colors'];
}

const Info = ({ icon, label, text, iconColor = 'foreground' }: InfoProps) => {
  const { colors } = useTheme<Theme>();
  return (
    <Box
      borderRadius="m"
      alignItems="center"
      borderColor="gray"
      borderWidth={1}
      mx="s"
      py="m"
      width={120}>
      {icon && <Icon name={icon} size={24} color={colors[iconColor]} />}
      <Text color="gray" fontWeight="700" fontSize={16}>
        {label}
      </Text>
      <Text color="dark" fontWeight="700" fontSize={18}>
        {text}
      </Text>
    </Box>
  );
};

export default Info;
