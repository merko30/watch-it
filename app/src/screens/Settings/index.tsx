import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Section from './Section';

import { Theme, ThemeContext } from '@/theme/ThemeProvider';

import Setting from './Setting';

// import Email from './Email';
import Password from './Password';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Settings = () => {
  const { colors, spacing } = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);

  const [darkMode, setDarkMode] = useState(mode === Theme.DARK);

  const onChangeTheme = async (checked: boolean) => {
    const themeToSet = checked ? Theme.DARK : Theme.LIGHT;
    await AsyncStorage.setItem('theme', themeToSet);

    setDarkMode(checked);

    toggleTheme();
  };

  console.log('darkMode', darkMode);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingVertical: spacing.m,
        },
      ]}>
      <Section title="Account settings" icon="person-outline">
        <Password />
      </Section>
      <Section title="Appearance" icon="color-palette-outline">
        <Setting
          label="Dark mode"
          type="checkbox"
          checked={darkMode}
          onChange={onChangeTheme}
        />
      </Section>
    </ScrollView>
  );
};

export default Settings;
