import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import {
  // Message,
  AuthLayout,
} from '../components';
import Code from '../components/Code';

import { AuthStackParamList } from '../navigation/AuthNavigator';

// import {RootState} from '../store/reducers';
// import {verifyResetCode} from '../store/reducers/auth';

// import {useSelector, useDispatch} from 'react-redux';

interface VerifyCodeProps
  extends StackScreenProps<AuthStackParamList, 'VerifyCode'> {}

const VerifyCode = ({
  route: {
    // params: {email, code},
  },
}: VerifyCodeProps) => {
  // const dispatch = useDispatch();

  // const {loading, error, message} = useSelector(
  //   (state: RootState) => state.auth,
  // );

  // const onSubmit = (code: string) => {
  //   dispatch(verifyResetCode({email, code}));
  // };

  return (
    <AuthLayout
      back
      title="Here is a final step"
      text="Enter the code from email">
      <View style={{ flex: 1.4 }}>
        {!true ? (
          <>
            {/* {error && <Message variant="error" message={error} />}
            {message && <Message variant="success" message={message} />} */}

            <Code
              length={6}
              autoVerification={true}
              onFilled={code => console.log(code)}
            />
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    </AuthLayout>
  );
};

export default VerifyCode;
