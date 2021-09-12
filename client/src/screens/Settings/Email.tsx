import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useMutation } from 'react-query';

import FormikField from 'components/TextField/FormikField';
import Button from 'components/Button';

import { updateEmailRequest } from 'api/users';

import Section from './Section';

import { emailSchema } from './validationSchemas';

const Email = () => {
  const { mutate: updateEmail } = useMutation((email: string) =>
    updateEmailRequest(email),
  );
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: values => updateEmail(values.email),
  });

  const { handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Section title="Change your email" isSubsection>
        <FormikField
          name="email"
          autoCapitalize="none"
          label="Your new email"
          returnKeyType="done"
          returnKeyLabel="Save"
          onSubmitEditing={handleSubmit}
        />
        <Button onPress={handleSubmit} color="gray" label="Save" />
      </Section>
    </FormikProvider>
  );
};

export default Email;
