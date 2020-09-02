import React from 'react';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import {Formik, FormikValues} from 'formik';
import * as Yup from 'yup';
import {useTheme} from '@shopify/restyle';

import {TextField, Message, Button, AuthHeader} from '../components';

import {login} from '../store/reducers/auth';
import {RootState} from '../store/reducers';

import {Theme} from '../theme';

import {LoginData} from '../types';

const loginSchema = Yup.object().shape({
  password: Yup.string().required('Password is required field'),
  emailOrUsername: Yup.string().required('This field is required'),
});

const LoginScreen = ({navigation}: StackScreenProps<any, 'Login'>) => {
  const dispatch = useDispatch();
  const {colors, spacing, fontSizes} = useTheme<Theme>();

  const {loading, error, message} = useSelector(
    (state: RootState) => state.auth,
  );

  const onSubmit = (data: FormikValues) => {
    dispatch(login(data as LoginData));
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
        <AuthHeader title="Welcome back" text="We're happy to see you again." />

        <Formik
          initialValues={{emailOrUsername: '', password: ''}}
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
              <View style={{flex: 2}}>
                {!loading ? (
                  <>
                    {error && <Message variant="negative" message={error} />}
                    {message && (
                      <Message variant="positive" message={message} />
                    )}

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
                      color={colors.primary}
                      onPress={handleSubmit}
                      // style={{alignItems: 'center', justifyContent: 'center'}}
                      label="Sign in"
                      textStyle={{
                        fontSize: fontSizes.textSm,
                        textTransform: 'uppercase',
                        fontWeight: '700',
                      }}
                      containerStyle={{marginTop: 40, paddingVertical: 12}}
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

export default LoginScreen;
