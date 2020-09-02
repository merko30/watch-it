import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useNavigation, ParamListBase} from '@react-navigation/native';

import RoundedIcon from '../../../components/RoundedIcon';
import theme from '../../../theme';

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
    fontSize: theme.fontSizes.subTitle,
    marginLeft: theme.spacing.l,
    fontWeight: '600',
  },
});

type ProfileItemProps = {
  title: string;
  icon: string;
  color: string;
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

  const onPress = () => {
    if (name) {
      navigation.navigate(name, params);
    } else if (_onPress) {
      _onPress();
    }
  };
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity: 0.05,
          backgroundColor: color,
          borderRadius: 25,
        }}
      />
      <RoundedIcon icon={icon} size={42} color={color} />
      <Text style={[styles.title, {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ProfileItem;
