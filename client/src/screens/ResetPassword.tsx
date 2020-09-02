import React from 'react';
import {Formik, FormikValues} from 'formik';
import {View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@shopify/restyle';
import {StackScreenProps} from '@react-navigation/stack';
import * as Yup from 'yup';

import {Message, TextField, Button, AuthHeader} from '../components';

import {RootState} from '../store/reducers';
import {resetPassword} from '../store/reducers/auth';

import {Theme} from '../theme';

import {RootStackParamList} from '../navigation';
import {AuthStackParamList} from 'src/navigation/AuthNavigator';

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Type your new password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
});

interface ResetPasswordProps
  extends StackScreenProps<AuthStackParamList, 'ResetPassword'> {}

const ResetPassword = ({
  route: {
    params: {email},
  },
}: ResetPasswordProps) => {
  const dispatch = useDispatch();
  const {colors, spacing, fontSizes} = useTheme<Theme>();

  const {loading, error, message} = useSelector(
    (state: RootState) => state.auth,
  );

  const onSubmit = (values: FormikValues) => {
    dispatch(resetPassword(email, values.password));
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: spacing.l,
      }}>
      <AuthHeader
        back
        title="Reset your password"
        text="Type your new password"
      />

      <Formik
        initialValues={{password: '', confirmPassword: ''}}
        validationSchema={resetPasswordSchema}
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
            <View style={{flex: 1.4}}>
              {!loading ? (
                <>
                  {error && <Message variant="negative" message={error} />}
                  {message && <Message variant="positive" message={message} />}

                  <TextField
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={errors['password']}
                    touched={touched['password']}
                    value={values.password}
                    label="Password"
                  />

                  <TextField
                    autoCapitalize="none"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={errors['confirmPassword']}
                    touched={touched['confirmPassword']}
                    value={values.confirmPassword}
                    label="Confirm your password"
                  />

                  <Button
                    color={colors.primary}
                    onPress={handleSubmit}
                    label="Save new password"
                    textStyle={{
                      fontWeight: '700',
                      fontSize: fontSizes.textSm,
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
    </View>
  );
};

export default ResetPassword;
