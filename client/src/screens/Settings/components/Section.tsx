import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from '@shopify/restyle';

import theme, {Theme, Box, Text} from '../../../theme';

const styles = StyleSheet.create({
  section: {
    marginTop: theme.spacing.m,
  },
  row: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: theme.spacing.s,
    fontSize: theme.fontSizes.textLg,
    color: theme.colors.gray,
  },
});

interface SectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const Section = ({icon, title, children, containerStyle}: SectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const {colors} = useTheme<Theme>();

  return (
    <View style={styles.section}>
      <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
        <View style={[styles.row, containerStyle]}>
          <View style={styles.titleContainer}>
            {icon && <Icon name={icon} size={24} color={colors.foreground} />}
            <Text variant="body" marginLeft="s" color="foreground">
              {title}
            </Text>
          </View>
          <Icon
            name={`chevron-${expanded ? 'up' : 'down'}`}
            color={colors.gray}
            size={24}
          />
        </View>
      </TouchableWithoutFeedback>
      <Box paddingHorizontal="m">{expanded && children}</Box>
    </View>
  );
};

export default Section;
