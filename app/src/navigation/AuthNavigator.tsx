import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyCode,
} from '../screens';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
  VerifyCode: { email: string; code: string };
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{ headerShown: false }}
        component={Register}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{ headerShown: false }}
        component={ForgotPassword}
      />
      <Stack.Screen
        name="ResetPassword"
        options={{ headerShown: false }}
        component={ResetPassword}
      />
      <Stack.Screen
        name="VerifyCode"
        options={{ headerShown: false }}
        component={VerifyCode}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
