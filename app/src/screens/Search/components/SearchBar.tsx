import React, { useState, useEffect } from 'react';
import { StyleSheet, Keyboard, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Box } from '@/theme';
import { useTheme } from '@shopify/restyle';

const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    paddingVertical: 4,
    fontSize: 20,
    lineHeight: 24,
    marginLeft: 12,
  },
});

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [term, setTerm] = useState('');
  const [error, setError] = useState<boolean>(false);

  const { colors } = useTheme();

  const search = () => {
    if (term) {
      setError(false);
      onSearch(term);
      setTerm('');
      Keyboard.dismiss();
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (term.length > 3) {
        onSearch(term);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onSearch, term]);

  return (
    <Box
      mt="l"
      pl="s"
      py="s"
      mb="l"
      mx="m"
      bg="spacer"
      borderRadius="m"
      borderWidth={1}
      borderColor="primary">
      <Box flexDirection="row" alignItems="center">
        <Icon onPress={search} name="search" size={24} color={colors.primary} />
        <TextInput
          // underlineColorAndroid="transparent"
          style={styles.input}
          placeholder="Search for a movie..."
          onChangeText={(searchTerm: string) => setTerm(searchTerm)}
          value={term}
          onSubmitEditing={search}
          returnKeyType="search"
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
