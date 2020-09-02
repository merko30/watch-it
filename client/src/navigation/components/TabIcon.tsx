import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

interface TabIconProps {
  name: string;
  focused: boolean;
  color: string;
  size: number;
}

const TabIcon = ({name, focused, ...props}: TabIconProps) => {
  return <Icon name={name} {...props} />;
};

export default TabIcon;
