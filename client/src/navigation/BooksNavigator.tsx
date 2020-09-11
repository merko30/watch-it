import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@shopify/restyle';

import {Home, List} from '../screens';
import {BLANK_HEADER} from './headerStyles';

import {Theme} from '../theme';

import {BackIcon} from '../components';

const BooksNavigator = createStackNavigator();

const Books = () => {
  const {colors} = useTheme<Theme>();
  return (
    <BooksNavigator.Navigator>
      <BooksNavigator.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <BooksNavigator.Screen
        name="List"
        component={List}
        options={{
          title: '',
          headerBackImage: () => <BackIcon color={colors.foreground} />,
          headerBackTitleVisible: false,
          headerStyle: {
            ...BLANK_HEADER.headerStyle,
            backgroundColor: colors.background,
          },
        }}
      />
    </BooksNavigator.Navigator>
  );
};

export default Books;
