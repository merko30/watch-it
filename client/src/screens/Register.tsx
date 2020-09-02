import React from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import {useTheme} from '@shopify/restyle';
import {Formik, FormikValues} from 'formik';
import * as Yup from 'yup';

import {TextField, Button, Message, AuthHeader} from '../components';

import {register} from '../store/reducers/auth';
import {RootState} from '../store/reducers';

import {Theme} from '../theme';

const {width} = Dimensions.get('window');

const registerSchema = Yup.object().shape({
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

const Register = ({navigation}: StackScreenProps<any, 'Register'>) => {
  const dispatch = useDispatch();
  const {colors, spacing, fontSizes} = useTheme<Theme>();

  const {loading, error} = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: FormikValues) => {
    dispatch(register(data));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: spacing.l,
        }}>
        <AuthHeader back title="Join today" text="Track your bookshelves" />
        <Formik
          initialValues={{
            username: 'johndoe',
            email: 'john@m.com',
            password: 'password',
          }}
          onSubmit={onSubmit}
          validationSchema={registerSchema}>
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            values,
          }) => {
            return (
              <View style={{flex: 2}}>
                {!loading ? (
                  <View>
                    {error && <Message variant="negative" message={error} />}

                    <TextField
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      error={errors['username']}
                      touched={touched['username']}
                      label="Username"
                      value={values.username}
                    />

                    <TextField
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={errors['email']}
                      touched={touched['email']}
                      label="Email"
                      value={values.email}
                    />

                    <TextField
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={errors['password']}
                      touched={touched['password']}
                      label="Password"
                      value={values.password}
                      secureTextEntry
                    />
                    <Button
                      textStyle={{
                        fontSize: fontSizes.textSm,
                        textTransform: 'uppercase',
                        fontWeight: '700',
                      }}
                      containerStyle={{marginTop: 40, paddingVertical: 12}}
                      color={colors.primary}
                      onPress={handleSubmit}
                      label="Sign up"
                    />
                    <Button
                      textStyle={{
                        color: colors.primary,
                        alignSelf: 'flex-start',
                      }}
                      link
                      color="transparent"
                      onPress={() => navigation.navigate('Login')}
                      label="Have an account ? Sign in."
                    />
                  </View>
                ) : (
                  <ActivityIndicator size="large" />
                )}
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
