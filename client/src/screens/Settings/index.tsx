import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import Section from './Section';

import { ProfileNavigatorParamList } from 'navigation/ProfileNavigator';

import Button from 'components/Button';
import TextField from 'components/TextField';
// import Message from 'components/Message';

import { Theme, ThemeContext } from 'theme/ThemeProvider';

import Setting from './Setting';

import { validationSchema } from './validationSchemas';

import { updateEmailRequest, updatePasswordRequest } from 'api/users';

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

  const { values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
      email: '',
    },
    validationSchema,
    onSubmit: () => {
      return;
    },
  });

  const { password, newPassword, email } = values;

  const { mutate: updatePassword } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<{ message: string }>,
    { password: string; newPassword: string }
  >(() => updatePasswordRequest(password, newPassword));

  // const { mutate: updateUser } = useMutation((data: Partial<User>) =>
  //   updateUserRequest(data),
  // );

  const { mutate: updateEmail } = useMutation(() => updateEmailRequest(email));

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: colors.background,
        paddingVertical: spacing.m,
      }}>
      <Section title="General settings" icon="settings-outline">
        <Setting
          label="Dark mode"
          type="checkbox"
          checked={darkMode}
          onChange={onChangeTheme}
        />
      </Section>
      <Section title="Account settings" icon="person-outline">
        {/* {message && <Message variant="positive" message={message} />}
        {error && <Message variant="negative" message={error} />} */}
        <Section
          title="Change your email"
          containerStyle={{ paddingHorizontal: 0 }}>
          <TextField
            name="email"
            containerStyle={{ marginBottom: 10 }}
            autoCapitalize="none"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            error={errors['email']}
            touched={touched['email']}
            value={values.email}
            label="Your new email"
            returnKeyType="done"
            returnKeyLabel="Save"
            onSubmitEditing={() => updateEmail()}
          />
          <Button
            onPress={() => updateEmail()}
            color="gray"
            textStyle={{ textTransform: 'uppercase', fontWeight: '700' }}
            containerStyle={{ marginBottom: spacing.m, width: 100 }}
            label="Save"
          />
        </Section>

        <Section
          title="Change your password"
          containerStyle={{ paddingHorizontal: 0 }}>
          <TextField
            name="password"
            containerStyle={{ marginBottom: 10, marginTop: 10 }}
            autoCapitalize="none"
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            error={errors['password']}
            touched={touched['password']}
            value={values.password}
            label="Your old password"
            secureTextEntry
          />
          <TextField
            name="newPassword"
            containerStyle={{ marginBottom: 10 }}
            autoCapitalize="none"
            onChangeText={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
            error={errors['newPassword']}
            touched={touched['newPassword']}
            value={values.newPassword}
            label="New password"
            secureTextEntry
          />
          <TextField
            name="confirmPassword"
            containerStyle={{ marginBottom: 10 }}
            autoCapitalize="none"
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            error={errors['confirmPassword']}
            touched={touched['confirmPassword']}
            value={values.confirmPassword}
            label="Confirm new Password"
            secureTextEntry
          />
          <Button
            onPress={() => updatePassword}
            color="gray"
            textStyle={{ textTransform: 'uppercase', fontWeight: '700' }}
            containerStyle={{ marginVertical: spacing.m, width: 100 }}
            label="Save"
          />
        </Section>
      </Section>
    </ScrollView>
  );
};

export default Settings;
