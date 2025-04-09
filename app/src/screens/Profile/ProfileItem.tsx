import React from 'react';
import {StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';

import RoundedIcon from '@/components/RoundedIcon';

import theme, {Theme, Box, Text} from '@/theme';

import {ProfileNavigatorParamList} from 'navigation/ProfileNavigator';

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
  | {
      name: keyof ProfileNavigatorParamList;
      params?: any;
      onPress?: never;
    }
  | {name?: never; params?: never; onPress: () => void}
);

type ProfileScreenNavigationProp =
  StackNavigationProp<ProfileNavigatorParamList>;

const ProfileItem = ({
  title,
  icon,
  color,
  name,
  params,
  style,
  onPress: _onPress,
}: ProfileItemProps) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
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
