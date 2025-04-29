import React from 'react';
import { View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { AuthLayout, Message } from '../components';
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
  const { mutate, error, variables } = useMutation<
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
          {error && <Message variant="error" message={error.message} />}

          <Code
            length={6}
            autoVerification={true}
            onFilled={code => mutate({ code, email })}
          />
        </>
      </View>
    </AuthLayout>
  );
};

export default VerifyCode;
