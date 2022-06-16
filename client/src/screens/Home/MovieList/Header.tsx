import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from 'navigation';

import { Box, Text } from 'theme';

interface HeaderProps {
  title: string;
  name: string;
  onExpand: () => void;
}

const Header = ({ title, name, onExpand }: HeaderProps) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <Box
      flexDirection="row"
      flex={1}
      justifyContent="space-between"
      pt="xs"
      px="s">
      <TouchableWithoutFeedback onPress={onExpand}>
        <Text fontWeight="600" textTransform="uppercase">
          {title}
        </Text>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => navigate('List', { shelf: name })}>
        <Text variant="body">Show all movies</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default Header;
