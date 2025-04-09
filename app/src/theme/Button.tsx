import React from 'react';
import {createBox} from '@shopify/restyle';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {Theme} from '@/theme';

const Base = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

interface ButtonProps extends React.ComponentProps<typeof Base> {
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => <Base {...props} />;

export default Button;
