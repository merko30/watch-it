import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackScreenProps } from '@react-navigation/stack';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import Button from '@/components/Button';
import AuthLayout from '@/components/AuthLayout';
import FormikField from '@/components/TextField/FormikField';

import { AuthStackParamList } from 'navigation/AuthNavigator';

import validationSchema from './validationSchema';
import { resetPassword } from '@/api/users';
import { navigate } from '@/utils/navigation';
import { Notifier } from 'react-native-notifier';

interface ResetPasswordProps
  extends StackScreenProps<AuthStackParamList, 'ResetPassword'> {}

const ResetPassword = ({
  route: {
    params: { email },
  },
}: ResetPasswordProps) => {
  // const {fontSizes} = useTheme<Theme>();

  const { mutate } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<{ message: string }>,
    { password: string; email: string }
  >({
    mutationFn: data => resetPassword(data.password, data.email),
    onError: data => console.log(data.status),
    onSuccess: () => {
      navigate('Login');
      Notifier.showNotification({
        title: 'Success',
        description: 'Password changed successfully',
      });
    },
  });

  const formik = useFormik({
    initialValues: { password: 'newpassword', confirmPassword: 'newpassword' },
    validationSchema,
    onSubmit: values => {
      mutate({ password: values.password, email });
    },
  });

  const { handleSubmit } = formik;

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <AuthLayout
        back
        title="Reset your password"
        text="Type your new password">
        <FormikProvider value={formik}>
          <FormikField
            name="password"
            autoCapitalize="none"
            label="Password"
            secureTextEntry
          />
          <FormikField
            name="confirmPassword"
            autoCapitalize="none"
            label="Confirm your password"
            secureTextEntry
          />
          <Button
            color="primary"
            onPress={handleSubmit}
            label="Save new password"
            // TODO: add variant
            textStyle={{
              fontWeight: '700',
              // fontSize: fontSizes.text,
              textTransform: 'uppercase',
            }}
            containerStyle={{ marginTop: 40, paddingVertical: 12 }}
          />
        </FormikProvider>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;
