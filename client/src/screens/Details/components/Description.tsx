import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '@shopify/restyle';
import AutoHeightWebView from 'react-native-autoheight-webview';

import {Box, Text, Theme} from '../../../theme';

interface DescriptionProps {
  description: string;
}

const Description = ({description}: DescriptionProps) => {
  const {colors} = useTheme<Theme>();
  const [loadingDescription, setLoadingDescription] = useState(true);

  return (
    <Box marginVertical="m" flex={1} minHeight={250}>
      <Text color="foreground" variant="subTitle" mb="s">
        Overview
      </Text>

      <AutoHeightWebView
        source={{
          html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>body{background-color: ${colors.background};color:${colors.foreground};font-size:18;font-family:sans-serif;}</style></head><body>${description}</body></html>`,
        }}
        style={{width: '100%'}}
        scalesPageToFit
        javaScriptEnabled
        showsVerticalScrollIndicator={false}
        onLoad={() => setLoadingDescription(false)}
      />
      {loadingDescription && (
        <Box flex={1} alignItems="center" backgroundColor="background">
          <ActivityIndicator size="large" color={colors.foreground} />
        </Box>
      )}
    </Box>
  );
};

export default Description;
