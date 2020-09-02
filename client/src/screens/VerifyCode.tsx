import React from 'react';
import {View, Button, ActivityIndicator} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useTheme} from '@shopify/restyle';

import {AuthHeader, Message} from '../components';
import Code from '../components/Code';

import {AuthStackParamList} from '../navigation/AuthNavigator';

import {RootState} from '../store/reducers';
import {verifyResetCode} from '../store/reducers/auth';

import {Theme} from '../theme';
import {useSelector, useDispatch} from 'react-redux';

interface VerifyCodeProps
  extends StackScreenProps<AuthStackParamList, 'VerifyCode'> {}

const VerifyCode = ({
  route: {
    params: {email, code},
  },
}: VerifyCodeProps) => {
  const {spacing} = useTheme<Theme>();
  const dispatch = useDispatch();

  const {loading, error, message} = useSelector(
    (state: RootState) => state.auth,
  );

  const onSubmit = (code: string) => {
    dispatch(verifyResetCode({email, code}));
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: spacing.l,
      }}>
      <AuthHeader
        back
        title="Here is a final step"
        text="Enter the code from email"
      />

      <View style={{flex: 1.4}}>
        {!loading ? (
          <>
            {error && <Message variant="negative" message={error} />}
            {message && <Message variant="positive" message={message} />}

            <Code
              length={6}
              autoVerification={true}
              onFilled={(code) => onSubmit(code)}
            />
          </>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </View>
    </View>
  );
};

export default VerifyCode;
