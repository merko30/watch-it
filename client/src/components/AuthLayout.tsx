import React from 'react';

import {Box} from '../theme';

import AuthHeader from './AuthHeader';
import {ScrollView, View} from 'react-native';

interface AuthLayoutProps {
  children: React.ReactNode;
  back?: boolean;
  title: string;
  text: string;
}

const AuthLayout = ({children, title, text, back}: AuthLayoutProps) => {
  return (
    <Box flex={1} paddingHorizontal="l" backgroundColor="background">
      <AuthHeader back={back} title={title} text={text} />
      <View style={{flex: 2}}>{children}</View>
    </Box>
  );
};

export default AuthLayout;
