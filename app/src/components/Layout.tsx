import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useTheme } from '@shopify/restyle';

import { Theme } from '../theme';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout = ({ title, children }: LayoutProps) => {
  const { spacing, fontSizes, colors } = useTheme<Theme>();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: spacing.m,
        backgroundColor: colors.background,
      }}>
      <Text
        style={{
          fontSize: fontSizes.titleXl,
          fontWeight: 'bold',
          color: colors.foreground,
          paddingVertical: spacing.m,
        }}>
        {title}
      </Text>
      {children}
    </SafeAreaView>
  );
};

export default Layout;
