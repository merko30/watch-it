import React from 'react';
import { useMutation } from 'react-query';
import { FormikProvider, useFormik } from 'formik';
import { AxiosError, AxiosResponse } from 'axios';

import Button from '@/components/Button';
import FormikField from '@/components/TextField/FormikField';

import { updateUser } from '@/api/users';

import Section from './Section';

import { passwordSchema } from './validationSchemas';
import { Notifier } from 'react-native-notifier';

const Password = () => {
  const { mutate: updatePassword } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<{ message: string }>,
    { password: string; newPassword: string }
  >({
    mutationFn: ({ password, newPassword }) =>
      updateUser({ password, newPassword }),
    onSuccess: () =>
      Notifier.showNotification({
        title: 'Success',
        description: 'Your password has been updated successfully',
      }),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: ({ password, newPassword }) =>
      updatePassword({ password, newPassword }),
  });

  const { handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Section title="Change your password" isSubsection>
        <FormikField
          name="password"
          autoCapitalize="none"
          label="Current password"
          secureTextEntry
        />
        <FormikField
          name="newPassword"
          autoCapitalize="none"
          label="New password"
          secureTextEntry
        />
        <FormikField
          name="confirmPassword"
          autoCapitalize="none"
          label="Confirm new Password"
          secureTextEntry
        />
        <Button onPress={handleSubmit} color="gray" label="Save" />
      </Section>
    </FormikProvider>
  );
};

export default Password;
