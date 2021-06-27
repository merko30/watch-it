import React from 'react';
import {useField} from 'formik';

import TextField, {TextFieldProps} from 'components/TextField';

interface FormikFieldProps extends TextFieldProps {}

const FormikField = ({name, ...props}: FormikFieldProps) => {
  const [field, meta, helpers] = useField(name);

  return (
    <TextField
      {...field}
      {...meta}
      {...helpers}
      onBlur={() => helpers.setTouched(true)}
      {...props}
    />
  );
};

export default FormikField;
