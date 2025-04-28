import React from 'react';
import { useFormik, FormikProvider } from 'formik';
import { useTheme } from '@shopify/restyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Message from '@/components/Message';
import Button from '@/components/Button';
import AuthLayout from '@/components/AuthLayout';
import FormikField from '@/components/TextField/FormikField';

import { Theme } from '../../theme';

import validationSchema from './validationSchema';
import { useMutation } from 'react-query';
import { sendResetMail } from '@/api/users';
import { AxiosError, AxiosResponse } from 'axios';
import { Notifier } from 'react-native-notifier';

const ForgotPassword = () => {
  const { fontSizes } = useTheme<Theme>();

  const { mutate, error } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<{ message: string }>,
    string
  >({
    mutationFn: sendResetMail,
    onSuccess: () =>
      Notifier.showNotification({
        title: 'Success',
        description: 'Check your email for further instructions',
      }),
  });

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema,
    onSubmit: values => mutate(values.email),
  });

  const { handleSubmit } = formik;

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <AuthLayout
        back
        title="Forgot your password"
        text="We're here to help you">
        <FormikProvider value={formik}>
          {error && (
            <Message
              variant="error"
              message={error.response?.data.message || 'Something went wrong'}
            />
          )}
          {/* {message && (
                      <Message variant="success" message={message} />
                    )} */}

          <FormikField autoCapitalize="none" name="email" label="Email" />

          <Button
            color="primary"
            onPress={handleSubmit}
            label="Reset password"
            // TODO: add variant
            textStyle={{
              fontWeight: '700',
              fontSize: fontSizes.text,
              textTransform: 'uppercase',
            }}
            containerStyle={{ marginTop: 40, paddingVertical: 12 }}
          />
        </FormikProvider>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
