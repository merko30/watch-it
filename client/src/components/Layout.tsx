import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useTheme} from '@shopify/restyle';

import {Theme} from '../theme';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({title, children}: LayoutProps) => {
  const {spacing, fontSizes, colors} = useTheme<Theme>();
  return (
    <SafeAreaView
      style={{flex: 1, paddingHorizontal: spacing.m, backgroundColor: 'white'}}>
      <Text
        style={{
          fontSize: fontSizes.titleLg,
          fontWeight: 'bold',
          color: colors.dark,
          paddingVertical: spacing.m,
        }}>
        {title}
      </Text>
      {children}
    </SafeAreaView>
  );
};

export default Layout;
