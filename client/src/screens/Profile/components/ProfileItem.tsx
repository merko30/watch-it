import React from 'react';
import {StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import RoundedIcon from '../../../components/RoundedIcon';
import theme, {Theme, Box, Text} from '../../../theme';
import {useTheme} from '@shopify/restyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.s,
    position: 'relative',
    padding: 4,
    paddingLeft: 0,
  },
  title: {
    fontSize: theme.fontSizes.titleM,
    marginLeft: theme.spacing.l,
    fontWeight: '600',
  },
});

type ProfileItemProps = {
  title: string;
  icon: string;
  color: keyof Theme['colors'];
  style?: StyleProp<ViewStyle>;
} & (
  | {name: string; params?: Record<string, any>; onPress?: never}
  | {name?: never; params?: never; onPress: () => void}
);

const ProfileItem = ({
  title,
  icon,
  color,
  name,
  params,
  style,
  onPress: _onPress,
}: ProfileItemProps) => {
  const navigation = useNavigation();
  const {borderRadii} = useTheme<Theme>();

  const onPress = () => {
    if (name) {
      navigation.navigate(name, params);
    } else if (_onPress) {
      _onPress();
    }
  };
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Box
        backgroundColor={color}
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: 0.05,
          borderRadius: borderRadii.xl,
        }}
      />
      <RoundedIcon icon={icon} size={42} color={color} />
      <Text color={color} style={[styles.title]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileItem;
