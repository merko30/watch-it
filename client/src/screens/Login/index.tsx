import React, {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FormikProvider, useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '@shopify/restyle';

import Message from 'components/Message';
import Button from 'components/Button';
import AuthLayout from 'components/AuthLayout';
import FormikField from 'components/TextField/FormikField';

import {Box, Theme} from '../../theme';

import {AuthContext, IAuthContext} from 'auth/AuthProvider';

import {LoginData} from '../../types';

import validationSchema from './validationSchema';

const LoginScreen = ({navigation}: StackScreenProps<any, 'Login'>) => {
  const {colors, fontSizes} = useTheme<Theme>();

  const formik = useFormik({
    initialValues: {emailOrUsername: '', password: ''},
    validationSchema,
    onSubmit: values => login(values as LoginData),
  });

  const {handleSubmit} = formik;

  const {login, error, loading} = useContext(AuthContext) as IAuthContext;

  // console.log('in login');

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <AuthLayout title="Welcome back" text="We're happy to see you again.">
        <FormikProvider value={formik}>
          {error && <Message variant="negative" message={error!} />}
          {/* {message && <Message variant="positive" message={message} />} */}

          <FormikField
            autoCapitalize="none"
            name="emailOrUsername"
            label="Email or username"
          />

          <FormikField
            autoCapitalize="none"
            name="password"
            label="Password"
            secureTextEntry
          />
          <Button
            color="primary"
            onPress={handleSubmit}
            // style={{alignItems: 'center', justifyContent: 'center'}}
            // TODO: create variant
            textStyle={{
              fontSize: fontSizes.text,
              textTransform: 'uppercase',
              fontWeight: '700',
            }}
            containerStyle={{marginTop: 40, paddingVertical: 12}}
            label={'Sign in'}
            // loading={loading}
          />
          <Box
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row">
            <Button
              link
              textStyle={{
                color: colors.primary,
              }}
              color="transparent"
              onPress={() => navigation.navigate('Register')}
              label="Create account"
              loading={loading}
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
          </Box>
        </FormikProvider>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
