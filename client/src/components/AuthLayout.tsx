import React from 'react';

import {Box} from '../theme';

import AuthHeader from './AuthHeader';

interface AuthLayoutProps {
  children: React.ReactNode;
  back?: boolean;
  title: string;
  text: string;
}

const AuthLayout = ({children, title, text, back}: AuthLayoutProps) => {
  return (
    <Box flex={1} paddingHorizontal="l" backgroundColor="background">
      <AuthHeader back title={title} text={text} />
      {children}
    </Box>
  );
};

export default AuthLayout;
