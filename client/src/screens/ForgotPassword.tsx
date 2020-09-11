import React from 'react';
import {Formik} from 'formik';
import {
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@shopify/restyle';
import * as Yup from 'yup';

import {Message, TextField, Button, AuthLayout} from '../components';

import {RootState} from '../store/reducers';
import {sendResetPasswordMail} from '../store/reducers/auth';

import {Theme} from '../theme';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('This field is required').email('Invalid email'),
});

interface ForgotPasswordProps {}

const ForgotPassword = (props: ForgotPasswordProps) => {
  const dispatch = useDispatch();
  const {fontSizes} = useTheme<Theme>();

  const {loading, error, message} = useSelector(
    (state: RootState) => state.auth,
  );

  const onSubmit = (email: string) => {
    dispatch(sendResetPasswordMail(email));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <AuthLayout
        back
        title="Forgot your password"
        text="We're here to help you">
        <Formik
          initialValues={{email: ''}}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values) => onSubmit(values.email)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            errors,
            values,
          }) => {
            return (
              <View style={{flex: 1.4}}>
                {!loading ? (
                  <>
                    {error && <Message variant="negative" message={error} />}
                    {message && (
                      <Message variant="positive" message={message} />
                    )}

                    <TextField
                      autoCapitalize="none"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={errors['email']}
                      touched={touched['email']}
                      value={values.email}
                      label="Email"
                    />

                    <Button
                      color="primary"
                      onPress={handleSubmit}
                      label="Reset password"
                      textStyle={{
                        fontWeight: '700',
                        fontSize: fontSizes.text,
                        textTransform: 'uppercase',
                      }}
                      containerStyle={{marginTop: 40, paddingVertical: 12}}
                    />
                  </>
                ) : (
                  <ActivityIndicator size="large" />
                )}
              </View>
            );
          }}
        </Formik>
      </AuthLayout>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
