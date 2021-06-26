import React from 'react';
import {Formik} from 'formik';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '@shopify/restyle';
import * as Yup from 'yup';

import {
  // Message,
  TextField,
  Button,
  AuthLayout,
} from '../components';

// import {RootState} from '../store/reducers';
// import {sendResetPasswordMail} from '../store/reducers/auth';

import {Theme} from '../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('This field is required').email('Invalid email'),
});

interface ForgotPasswordProps {}

const ForgotPassword = () => {
  // const dispatch = useDispatch();
  const {fontSizes, colors} = useTheme<Theme>();

  // const {loading, error, message} = useSelector(
  //   (state: RootState) => state.auth,
  // );

  // const onSubmit = (email: string) => {
  //   dispatch(sendResetPasswordMail(email));
  // };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{flex: 1}}>
      <AuthLayout
        back
        title="Forgot your password"
        text="We're here to help you">
        <Formik
          initialValues={{email: ''}}
          validationSchema={forgotPasswordSchema}
          onSubmit={values => console.log(values.email)}>
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
                {!true ? (
                  <>
                    {/* {error && <Message variant="negative" message={error} />}
                    {message && (
                      <Message variant="positive" message={message} />
                    )} */}

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
                  <ActivityIndicator size="large" color={colors.foreground} />
                )}
              </>
            );
          }}
        </Formik>
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
