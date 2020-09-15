import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import {Formik, FormikValues} from 'formik';
import * as Yup from 'yup';
import {useTheme} from '@shopify/restyle';

import {TextField, Message, Button, AuthLayout} from '../components';

import {login} from '../store/reducers/auth';
import {RootState} from '../store/reducers';

import {Theme} from '../theme';

import {LoginData} from '../types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const loginSchema = Yup.object().shape({
  password: Yup.string().required('Password is required field'),
  emailOrUsername: Yup.string().required('This field is required'),
});

const LoginScreen = ({navigation}: StackScreenProps<any, 'Login'>) => {
  const dispatch = useDispatch();
  const {colors, fontSizes} = useTheme<Theme>();

  const {loading, error, message} = useSelector(
    (state: RootState) => state.auth,
  );

  const onSubmit = (data: FormikValues) => {
    dispatch(login(data as LoginData));
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <AuthLayout title="Welcome back" text="We're happy to see you again.">
        <Formik
          initialValues={{emailOrUsername: 'joe7@gmail.com', password: ''}}
          validationSchema={loginSchema}
          onSubmit={onSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
            values,
          }) => {
            return (
              <>
                {error && <Message variant="negative" message={error} />}
                {message && <Message variant="positive" message={message} />}

                <TextField
                  autoCapitalize="none"
                  onChangeText={handleChange('emailOrUsername')}
                  onBlur={handleBlur('emailOrUsername')}
                  error={errors['emailOrUsername']}
                  touched={touched['emailOrUsername']}
                  value={values.emailOrUsername}
                  label="Email or username"
                />

                <TextField
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={errors['password']}
                  touched={touched['password']}
                  value={values.password}
                  label="Password"
                  secureTextEntry
                />
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  // style={{alignItems: 'center', justifyContent: 'center'}}
                  textStyle={{
                    fontSize: fontSizes.text,
                    textTransform: 'uppercase',
                    fontWeight: '700',
                  }}
                  containerStyle={{marginTop: 40, paddingVertical: 12}}
                  label={'Sign in'}
                  loading={loading}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Button
                    link
                    textStyle={{
                      color: colors.primary,
                    }}
                    color="transparent"
                    onPress={() => navigation.navigate('Register')}
                    label="Create account"
                  />
                  <Button
                    link
                    textStyle={{
                      color: colors.primary,
                    }}
                    color="transparent"
                    onPress={() => navigation.navigate('ForgotPassword')}
                    label="Forgot password?"
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
