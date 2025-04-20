import React from 'react';
import { FormikProvider, useFormik, FormikValues } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackScreenProps } from '@react-navigation/stack';

import Button from '@/components/Button';
import AuthLayout from '@/components/AuthLayout';
import FormikField from '@/components/TextField/FormikField';

import { AuthStackParamList } from 'navigation/AuthNavigator';

import validationSchema from './validationSchema';

interface ResetPasswordProps
  extends StackScreenProps<AuthStackParamList, 'ResetPassword'> {}

const ResetPassword = ({
  route: {
    params: { email },
  },
}: ResetPasswordProps) => {
  // const {fontSizes} = useTheme<Theme>();

  const onSubmit = (values: FormikValues) => {
    // TODO: send reset password email
    console.log(email, values.password);
  };

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema,
    onSubmit,
  });

  const { handleSubmit } = formik;

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <AuthLayout
        back
        title="Reset your password"
        text="Type your new password">
        <FormikProvider value={formik}>
          {' '}
          {/* {error && <Message variant="error" message={error} />}
                    {message && (
                      <Message variant="success" message={message} />
                    )} */}
          <FormikField
            name="password"
            autoCapitalize="none"
            label="Password"
            secureTextEntry
          />
          <FormikField
            name="confirmPassword"
            autoCapitalize="none"
            label="Confirm your password"
            onSubmitEditing={handleSubmit}
            secureTextEntry
          />
          <Button
            color="primary"
            onPress={handleSubmit}
            label="Save new password"
            // TODO: add variant
            textStyle={{
              fontWeight: '700',
              // fontSize: fontSizes.text,
              textTransform: 'uppercase',
            }}
            containerStyle={{ marginTop: 40, paddingVertical: 12 }}
          />
        </FormikProvider>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

export default ResetPassword;
