import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import RoundedIcon from '@/components/RoundedIcon';

import { Theme, Box, Text } from '@/theme';

import { ProfileNavigatorParamList } from 'navigation/ProfileNavigator';
import { useTheme } from '@shopify/restyle';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 10,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    justifyContent: 'space-between',
  },
});

type ProfileItemProps = {
  title: string;
  icon: string;
  color?: keyof Theme['colors'];
  style?: StyleProp<ViewStyle>;
} & (
  | {
      name: keyof ProfileNavigatorParamList;
      params?: any;
      onPress?: never;
    }
  | { name?: never; params?: never; onPress: () => void }
);

type ProfileScreenNavigationProp =
  StackNavigationProp<ProfileNavigatorParamList>;

const ProfileItem = ({
  title,
  icon,
  color = 'foreground',
  name,
  params,
  style,
  onPress: _onPress,
}: ProfileItemProps) => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { colors } = useTheme<Theme>();
  const onPress = () => {
    if (name) {
      navigation.navigate(name, params);
    } else if (_onPress) {
      _onPress();
    }
  };
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.spacer,
        },
      ]}
      onPress={onPress}>
      <Box flexDirection="row" alignItems="center">
        <RoundedIcon
          icon={icon}
          size={36}
          style={{ backgroundColor: 'transparent', marginLeft: 5 }}
          color={color}
        />
        <Text color={color} variant="subtitle" fontWeight="600">
          {title}
        </Text>
      </Box>
      <Icon
        name="chevron-forward-outline"
        style={{
          color: colors.spacer,
          paddingRight: 10,
        }}
        size={20}
      />
    </TouchableOpacity>
  );
};

export default ProfileItem;
