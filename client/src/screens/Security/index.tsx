import React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useTheme} from '@shopify/restyle';
import * as Yup from 'yup';

import Section from './components/Section';

import {ProfileNavigatorParamList} from '../../navigation/ProfileNavigator';

import theme, {Theme} from '../../theme';

import {TextField, Button, Message} from '../../components';

import {useFormik, FormikValues} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {setPassword, updateUser} from '../../store/reducers/auth';
import {RootState} from 'src/store/reducers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: theme.spacing.m,
  },
});

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
  oldPassword: Yup.string().required('Please type your old password'),
  password: Yup.string().required('Password is required field'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Please type your old password'),
  password: Yup.string().required('Password is required field'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

const emailSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Invalid email'),
});

const validate = (
  values: FormikValues,
  schema: Yup.Schema<any>,
  callback: () => void,
  errorCallback: (path: string, message: string) => void,
) => {
  schema
    .validate(values, {
      abortEarly: false,
    })
    .then(() => {
      if (schema.isValid(values)) {
        callback();
      }
    })
    .catch((err) => handleYupErrors(err, errorCallback));
};

const handleYupErrors = (
  err: Yup.ValidationError,
  callback: (path: string, message: string) => void,
) => {
  err.inner.map(({path, message}: {path: string; message: string}) => {
    callback(path, message);
  });
};

interface SecurityProps
  extends StackScreenProps<ProfileNavigatorParamList, 'Security'> {}

const Security = (props: SecurityProps) => {
  const {colors, spacing} = useTheme<Theme>();
  const dispatch = useDispatch();
  const {message, error} = useSelector((state: RootState) => state.auth);

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldError,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
    validationSchema,
    onSubmit: () => {
      return;
    },
  });

  const errorHandler = (field: string, value: string) => {
    setFieldError(field, value);
    setFieldTouched(field);
  };

  const updatePassword = async () => {
    const {oldPassword, password, confirmPassword} = values;
    let vals = {oldPassword, password, confirmPassword};

    validate(
      vals,
      passwordSchema,
      () => dispatch(setPassword(oldPassword, password)),
      errorHandler,
    );
    // passwordSchema
    //   .validate(vals, {
    //     abortEarly: false,
    //   })
    //   .then(() => {
    //     if (passwordSchema.isValid({oldPassword, password})) {
    //       dispatch(setPassword(oldPassword, password));
    //     }
    //   })
    //   .catch((err) =>
    //     handleYupErrors(err, (path, message) => {
    //       setFieldError(path, message);
    //       setFieldTouched(path);
    //     }),
    //   );
  };

  const updateEmail = () => {
    const {email} = values;

    validate(
      {email},
      emailSchema,
      () => dispatch(updateUser({email})),
      errorHandler,
    );
    // emailSchema
    //   .validate(
    //     {email},
    //     {
    //       abortEarly: false,
    //     },
    //   )
    //   .then(() => {
    //     if (passwordSchema.isValid({email})) {
    //       dispatch(updateUser({email}));
    //     }
    //   })
    //   .catch((err) =>
    //     handleYupErrors(err, (path, message) => {
    //       setFieldError(path, message);
    //       setFieldTouched(path);
    //     }),
    //   );
  };

  return (
    <View style={styles.container}>
      {message && <Message variant="positive" message={message} />}
      {error && <Message variant="negative" message={error} />}
      <Section title="Change email" icon="mail-outline">
        <TextField
          containerStyle={{marginBottom: 10, marginTop: 10}}
          autoCapitalize="none"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors['email']}
          touched={touched['email']}
          value={values.email}
          label="Your new email"
        />
        <Button
          onPress={() => updateEmail()}
          color={colors.positive}
          textStyle={{textTransform: 'uppercase', fontWeight: '700'}}
          containerStyle={{marginBottom: spacing.m}}
          label="Save"
        />
      </Section>
      <Section title="Change password" icon="key-outline">
        <TextField
          containerStyle={{marginBottom: 10, marginTop: 10}}
          autoCapitalize="none"
          onChangeText={handleChange('oldPassword')}
          onBlur={handleBlur('oldPassword')}
          error={errors['oldPassword']}
          touched={touched['oldPassword']}
          value={values.oldPassword}
          label="Your old password"
          secureTextEntry
        />
        <TextField
          containerStyle={{marginBottom: 10}}
          autoCapitalize="none"
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          error={errors['password']}
          touched={touched['password']}
          value={values.password}
          label="New password"
          secureTextEntry
        />
        <TextField
          containerStyle={{marginBottom: 10}}
          autoCapitalize="none"
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          error={errors['confirmPassword']}
          touched={touched['confirmPassword']}
          value={values.confirmPassword}
          label="Confirm new Password"
          secureTextEntry
        />
        <Button
          onPress={() => updatePassword()}
          color={colors.positive}
          textStyle={{textTransform: 'uppercase', fontWeight: '700'}}
          containerStyle={{marginVertical: spacing.m}}
          label="Save"
        />
      </Section>
    </View>
  );
};

export default Security;
