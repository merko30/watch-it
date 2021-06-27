import React, {useContext} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useTheme} from '@shopify/restyle';
import {FormikProvider, FormikValues, useFormik} from 'formik';

import Button from 'components/Button';
import Message from 'components/Message';
import AuthLayout from 'components/AuthLayout';
import FormikField from 'components/TextField/FormikField';

import {Theme} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthContext, IAuthContext} from 'auth/AuthProvider';

import validationSchema from './validationSchema';

const Register = ({navigation}: StackScreenProps<any, 'Register'>) => {
  const {colors, fontSizes} = useTheme<Theme>();

  const {register} = useContext(AuthContext) as IAuthContext;

  const onSubmit = (data: FormikValues) => register(data);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit,
    validationSchema,
  });

  const {loading, error} = useContext(AuthContext) as IAuthContext;

  const {handleSubmit} = formik;

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <AuthLayout back title="Join today" text="Track your bookshelves">
        <FormikProvider value={formik}>
          <View style={{flex: 2}}>
            {error && <Message variant="negative" message={error} />}

            <FormikField
              name="username"
              label="Username"
              autoCapitalize="none"
            />

            <FormikField name="email" label="Email" />

            <FormikField
              name="password"
              label="Password"
              secureTextEntry
              passwordRules={null}
            />
            {/* TODO: add variant */}
            <Button
              textStyle={{
                fontSize: fontSizes.text,
                textTransform: 'uppercase',
                fontWeight: '700',
              }}
              containerStyle={{marginTop: 40, paddingVertical: 12}}
              color="primary"
              onPress={handleSubmit}
              label="Sign up"
              loading={loading}
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
        </FormikProvider>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

export default Register;
