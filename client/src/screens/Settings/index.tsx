import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Section from './Section';

import { ProfileNavigatorParamList } from 'navigation/ProfileNavigator';

import { Theme, ThemeContext } from 'theme/ThemeProvider';

import Setting from './Setting';

import Email from './Email';
import Password from './Password';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface SettingsProps
  extends StackScreenProps<ProfileNavigatorParamList, 'Settings'> {}

const Settings = () => {
  const { colors, spacing } = useTheme();
  const { toggleTheme, mode } = useContext(ThemeContext);

  const [darkMode, setDarkMode] = useState(mode === Theme.DARK);

  const onChangeTheme = async (val: boolean) => {
    const themeToSet = val ? Theme.DARK : Theme.LIGHT;
    await AsyncStorage.setItem('theme', themeToSet);

    setDarkMode(val);

    toggleTheme();
  };

  // const { mutate: updateUser } = useMutation((data: Partial<User>) =>
  //   updateUserRequest(data),
  // );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingVertical: spacing.m,
        },
      ]}>
      <Section title="General settings" icon="settings-outline">
        <Setting
          label="Dark mode"
          type="checkbox"
          checked={darkMode}
          onChange={onChangeTheme}
        />
      </Section>
      <Section title="Account settings" icon="person-outline">
        <Email />
        <Password />
      </Section>
    </ScrollView>
  );
};

export default Settings;
