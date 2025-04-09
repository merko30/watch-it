import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should be longer than 8 characters')
    .required('Password is required field'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required field'),
  username: Yup.string()
    .required('Username is required field')
    .min(8, 'Username must have at least 8 characters'),
});

export default validationSchema;
