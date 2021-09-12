import React from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';
import { FormikProvider, FormikValues, useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useMutation } from 'react-query';

import Button from 'components/Button';
import Message from 'components/Message';
import AuthLayout from 'components/AuthLayout';
import FormikField from 'components/TextField/FormikField';

import { Theme } from 'theme';

import { createUser } from 'api/users';

import { User } from 'types';

import validationSchema from './validationSchema';

import { navigate } from 'utils/navigation';
import { AxiosError, AxiosResponse } from 'axios';

const Register = ({ navigation }: StackScreenProps<any, 'Register'>) => {
  const { colors, fontSizes } = useTheme<Theme>();

  const { mutate, error, isLoading } = useMutation<
    AxiosResponse<{ ok: boolean }>,
    AxiosError<{ message: string }>,
    Partial<User>
  >((input: Partial<User>) => createUser(input), {
    onSuccess: () => navigate('Login'),
  });

  const onSubmit = (data: FormikValues) => mutate(data);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema,
  });

  const { handleSubmit } = formik;

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <AuthLayout back title="Join today" text="Track your bookshelves">
        <FormikProvider value={formik}>
          <View style={{ flex: 2 }}>
            {error && <Message variant="negative" message={error.message} />}

            <FormikField
              name="username"
              placeholder="Username"
              autoCapitalize="none"
            />

            <FormikField name="email" placeholder="Email" />

            <FormikField
              name="password"
              placeholder="Password"
              secureTextEntry
              passwordRules={null}
            />
            {/* TODO: add variant */}
            <Button
              textStyle={{
                fontSize: fontSizes.text,
                textTransform: 'uppercase',
                fontWeight: '700',
              }}
              containerStyle={{ marginTop: 40, paddingVertical: 12 }}
              color="primary"
              onPress={handleSubmit}
              label="Sign up"
              loading={isLoading}
            />
            <Button
              textStyle={{
                color: colors.primary,
                alignSelf: 'flex-start',
              }}
              link
              color="transparent"
              onPress={() => navigation.navigate('Login')}
              label="Have an account ? Sign in."
            />
          </View>
        </FormikProvider>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

export default Register;
