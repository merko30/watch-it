import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Password is required field'),
  emailOrUsername: Yup.string().required('This field is required'),
});

export default validationSchema;
