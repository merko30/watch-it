import React, {useContext} from 'react';
import {useFormik, FormikProvider} from 'formik';
import {useTheme} from '@shopify/restyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Message from 'components/Message';
import Button from 'components/Button';
import AuthLayout from 'components/AuthLayout';
import FormikField from 'components/TextField/FormikField';

import {Theme} from '../../theme';

import {AuthContext, IAuthContext} from 'providers/AuthProvider';

import validationSchema from './validationSchema';

const ForgotPassword = () => {
  const {fontSizes} = useTheme<Theme>();

  const {error} = useContext(AuthContext) as IAuthContext;

  const formik = useFormik({
    initialValues: {email: ''},
    validationSchema,
    // TODO: add send forgot email
    onSubmit: values => console.log(values.email),
  });

  const {handleSubmit} = formik;

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <AuthLayout
        back
        title="Forgot your password"
        text="We're here to help you">
        <FormikProvider value={formik}>
          {error && <Message variant="negative" message={error} />}
          {/* {message && (
                      <Message variant="positive" message={message} />
                    )} */}

          <FormikField autoCapitalize="none" name="email" label="Email" />

          <Button
            color="primary"
            onPress={handleSubmit}
            label="Reset password"
            // TODO: add variant
            textStyle={{
              fontWeight: '700',
              fontSize: fontSizes.text,
              textTransform: 'uppercase',
            }}
            containerStyle={{marginTop: 40, paddingVertical: 12}}
          />
        </FormikProvider>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
