import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
  oldPassword: Yup.string().required('Please type your old password'),
  password: Yup.string().required('Password is required field'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Please type your old password'),
  password: Yup.string().required('Password is required field'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const emailSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
});
