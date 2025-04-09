import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import {Box, Text} from '@/theme';

interface InfoProps {
  text: string | number;
  last?: boolean;
  icon?: string;
}

const Info = ({text, last = false, icon}: InfoProps) => {
  return (
    <>
      <Box flexDirection="row" mr="m" alignItems="center">
        {icon && <Icon name={icon} size={18} />}
        <Text color="dark" ml={icon ? 's' : 0} fontWeight="700" fontSize={18}>
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
