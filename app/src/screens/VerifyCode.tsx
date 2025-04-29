import React, { useState } from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { AuthLayout, Message } from '../components';
import Button from '../components/Button';
import Code from '../components/Code';

import { AuthStackParamList } from '../navigation/AuthNavigator';
import { verifyCode } from '@/api/users';
import { navigate } from '@/utils/navigation';

interface VerifyCodeProps
  extends StackScreenProps<AuthStackParamList, 'VerifyCode'> {}

const VerifyCode = ({
  route: {
    params: { email },
  },
}: VerifyCodeProps) => {
  const [_code, setCode] = useState<string>('');
  const { mutate, error, failureCount } = useMutation<
    AxiosResponse<{ message: string }>,
    AxiosError<{ message: string }>,
    { email: string; code: string }
  >({
    mutationKey: 'verify',
    mutationFn: verifyCode,
    onSuccess: () => {
      navigate('ResetPassword', {
        email,
      });
    },
  });

  return (
    <AuthLayout
      back
      title="Here is a final step"
      text="Enter the code from email">
      <View style={{ flex: 1.4 }}>
        <>
          {error && (
            <Message
              variant="error"
              message={error.response?.data.message || 'Something went wrong'}
            />
          )}

          <Code
            length={6}
            onChange={(code: string) => {
              setCode(code);
            }}
            onFilled={code => {
              setCode(code);
              mutate({ code, email });
            }}
          />
          {failureCount > 0 && _code.length === 6 && (
            <Button
              label="Try again"
              color="primary"
              containerStyle={{ marginTop: 20 }}
              onPress={() => {
                mutate({ email, code: _code });
              }}
            />
          )}
        </>
      </View>
    </AuthLayout>
  );
};

export default VerifyCode;
