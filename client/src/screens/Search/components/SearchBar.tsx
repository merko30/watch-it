import React, {useState, useEffect} from 'react';
import {StyleSheet, Keyboard, TextInput} from 'react-native';
import {useTheme} from '@shopify/restyle';

import theme, {Theme, Box} from '../../../theme';
import {RoundedIcon} from '../../../components';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10,
    ...theme.shadows.medium,
    borderRadius: theme.borderRadii.m,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    lineHeight: 20,
    fontSize: theme.fontSizes.textLg,
  },
});

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({onSearch}: SearchBarProps) => {
  const {colors, shadows} = useTheme<Theme>();
  const [term, setTerm] = useState('');
  const [error, setError] = useState<boolean>(false);

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
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [error]);

  const errorStyle = error && {borderColor: colors.negative, borderWidth: 1};

  return (
    <Box
      backgroundColor="white"
      alignItems="center"
      mx="m"
      marginTop="xl"
      padding="s"
      borderRadius="m"
      style={[errorStyle, {...shadows.medium}]}>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Box flex={2} backgroundColor="white" paddingLeft="m">
          <TextInput
            // underlineColorAndroid="transparent"
            style={styles.input}
            placeholder="Search for a book..."
            onChangeText={(term: string) => setTerm(term)}
            value={term}
            // returnKeyLabel="Search"
            onSubmitEditing={search}
            returnKeyType="search"
          />
        </Box>
        <RoundedIcon onPress={search} icon="search" size={48} color="primary" />
      </Box>
    </Box>
  );
};

export default SearchBar;
