import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('This field is required').email('Invalid email'),
});

export default validationSchema;
