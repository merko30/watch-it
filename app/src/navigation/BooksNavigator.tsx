import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@shopify/restyle';

import { Home, List } from '../screens';
import { BLANK_HEADER } from './headerStyles';

import { Theme } from '@/theme';

import { BackIcon } from '@/components';

type BooksNavigatorParamList = {
  Home: undefined;
  List: { status: string };
};

const BooksNavigator = createStackNavigator<BooksNavigatorParamList>();

const Books = () => {
  const { colors } = useTheme<Theme>();
  return (
    <BooksNavigator.Navigator>
      <BooksNavigator.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <BooksNavigator.Screen
        name="List"
        component={List}
        options={{
          title: '',
          headerBackImage: () => <BackIcon color={colors.foreground} />,
          headerShown: false,
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
