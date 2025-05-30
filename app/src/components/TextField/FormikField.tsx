import React from 'react';
import { useField } from 'formik';
import omit from 'lodash.omit';

import TextField, { TextFieldProps } from '@/components/TextField';

interface FormikFieldProps extends TextFieldProps {}

const FormikField = ({ name, ...props }: FormikFieldProps) => {
  const [field, meta, { setValue }] = useField(name);

  const fieldProps = omit(field, ['onChange']);

  return (
    <TextField
      {...fieldProps}
      {...meta}
      onChangeText={text => setValue(text)}
      {...props}
      name={name}
      containerStyle={{ marginBottom: 8 }}
    />
  );
};

export default FormikField;
