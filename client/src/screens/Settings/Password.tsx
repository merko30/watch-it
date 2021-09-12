import React from 'react';
import { useMutation } from 'react-query';
import { FormikProvider, useFormik } from 'formik';

import Button from 'components/Button';
import FormikField from 'components/TextField/FormikField';

import { updatePasswordRequest } from 'api/users';

import Section from './Section';

import { passwordSchema } from './validationSchemas';
import { AxiosError, AxiosResponse } from 'axios';

const Password = () => {
  const { mutate: updatePassword } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<{ message: string }>,
    { password: string; newPassword: string }
  >({
    mutationFn: ({ password, newPassword }) =>
      updatePasswordRequest(password, newPassword),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
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
          label="Your old password"
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
