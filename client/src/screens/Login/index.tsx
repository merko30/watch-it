import React, {useEffect, useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {FormikProvider, useFormik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme} from '@shopify/restyle';
import {useMutation} from 'react-query';
import AsyncStorage from '@react-native-community/async-storage';

import Message from 'components/Message';
import Button from 'components/Button';
import AuthLayout from 'components/AuthLayout';
import FormikField from 'components/TextField/FormikField';

import {Box, Theme} from '../../theme';

import {LoginData} from '../../types';

import validationSchema from './validationSchema';
import {loginUser} from 'api/users';

import {AuthContext, IAuthContext} from 'providers/AuthProvider';
import {AxiosError, AxiosResponse} from 'axios';

const LoginScreen = ({navigation}: StackScreenProps<any, 'Login'>) => {
  const {colors, fontSizes} = useTheme<Theme>();

  const {setLoggedIn} = useContext(AuthContext) as IAuthContext;

  const {mutate, error, isLoading, data} = useMutation<
    AxiosResponse<any>,
    AxiosError<{message: string}>,
    LoginData
  >((input: LoginData) => loginUser(input));

  const formik = useFormik({
    initialValues: {emailOrUsername: 'joe7@gmail.com', password: 'password'},
    validationSchema,
    onSubmit: values => mutate(values),
  });

  const {handleSubmit} = formik;

  useEffect(() => {
    (async () => {
      if (data) {
        if (data.data.token) {
          await AsyncStorage.setItem('token', data.data.token);
          setLoggedIn!(true);
        }
      }
    })();
  }, [data, setLoggedIn]);

  const errorMessage = error?.response?.data.message || 'Something went wrong';
  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <AuthLayout title="Welcome back" text="We're happy to see you again.">
        <FormikProvider value={formik}>
          {error && <Message variant="negative" message={errorMessage} />}
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
            loading={isLoading}
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
