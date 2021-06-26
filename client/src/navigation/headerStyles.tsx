import React from 'react';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';

import {BackIcon} from '../components';

export const BLANK_HEADER = {
  title: '',
  headerStyle: {
    shadowOffset: {width: 0, height: 0},
    backgroundColor: '#fff',
    borderBottomWidth: 0,
  },
};

export const LEFT_ICON: StackHeaderOptions = {
  headerBackImage: () => <BackIcon />,
  headerBackTitleVisible: false,
};
