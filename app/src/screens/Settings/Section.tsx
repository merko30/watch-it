import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@shopify/restyle';

import { Theme, Box, Text } from '../../theme';

interface SectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  isSubsection?: boolean;
}

const Section = ({ icon, title, children, isSubsection }: SectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const { colors } = useTheme<Theme>();

  return (
    <Box
      px={isSubsection ? 0 : 'm'}
      borderBottomWidth={isSubsection ? 0 : 1}
      borderBottomColor={isSubsection ? 'transparent' : 'spacer'}>
      <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
        <Box flexDirection="row" py="m" justifyContent="space-between">
          <Box flexDirection="row" alignItems="center">
            {icon && <Icon name={icon} size={24} color={colors.foreground} />}
            <Text
              variant="body"
              textTransform={!isSubsection ? 'uppercase' : 'none'}
              marginLeft={icon ? 's' : 0}
              fontWeight={!isSubsection ? 'bold' : 'normal'}
              color="foreground">
              {title}
            </Text>
          </Box>
          <Icon
            name={`chevron-${expanded ? 'up' : 'down'}`}
            color={colors.spacer}
            size={24}
          />
        </Box>
      </TouchableWithoutFeedback>
      {expanded && <Box py={isSubsection ? 's' : 0}>{children}</Box>}
    </Box>
  );
};

export default Section;
