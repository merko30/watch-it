import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';

import { Box, Theme } from '../../theme';
import WebView from 'react-native-webview';

const styles = StyleSheet.create({
  webview: { width: '100%' },
});
interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  const { colors } = useTheme<Theme>();
  const [loadingDescription, setLoadingDescription] = useState(true);

  if (loadingDescription) {
    return (
      <Box flex={1} alignItems="center" py="xxl">
        <ActivityIndicator size="large" color={colors.dark} />
      </Box>
    );
  }
  return (
    <Box mt="m" py="m">
      <WebView
        source={{
          html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{background-color: transparent;color:${colors.foreground};text-align:center;font-size:18;font-family:sans-serif;}</style></head><body>${description}</body></html>`,
        }}
        style={styles.webview}
        scalesPageToFit
        javaScriptEnabled
        showsVerticalScrollIndicator={false}
        onLoad={() => setLoadingDescription(false)}
      />
    </Box>
  );
};

export default Description;
