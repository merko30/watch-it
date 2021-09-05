import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Type your new password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

export default validationSchema;
