import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@shopify/restyle';

import ProfileNavigator from './ProfileNavigator';
import Books from './BooksNavigator';

import Search from '../screens/Search';

import TabIcon from './components/TabIcon';

import { Theme } from '../theme';

const Tab = createBottomTabNavigator();

export type TabNavigatorParamList = {
  Movies: undefined;
  Profile: undefined;
  Search: undefined;
};

const TabNavigator = () => {
  const { colors } = useTheme<Theme>();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.primary,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: props => <TabIcon name="library" {...props} size={24} />,
        }}
        name="Movies"
        component={Books}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => <TabIcon name="person" {...props} size={24} />,
        }}
        name="Profile"
        component={ProfileNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => <TabIcon name="search" {...props} size={24} />,
        }}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
