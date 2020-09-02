import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useTheme} from '@shopify/restyle';

import theme, {Theme} from '../../../theme';

const styles = StyleSheet.create({
  section: {
    marginTop: theme.spacing.xl,
  },
  row: {
    paddingBottom: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
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
  icon: string;
  children: React.ReactNode;
}

const Section = ({icon, title, children}: SectionProps) => {
  const [expanded, setExpanded] = useState(false);

  const {colors} = useTheme<Theme>();

  return (
    <View style={styles.section}>
      <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
        <View style={styles.row}>
          <View style={styles.titleContainer}>
            <Icon name={icon} size={24} color={colors.gray} />
            <Text style={styles.text}>{title}</Text>
          </View>
          <Icon
            name={`chevron-${expanded ? 'up' : 'down'}`}
            color={colors.gray}
            size={24}
          />
        </View>
      </TouchableWithoutFeedback>

      {expanded && children}
    </View>
  );
};

export default Section;
