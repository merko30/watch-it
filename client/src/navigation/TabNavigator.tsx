import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@shopify/restyle';

import ProfileNavigator from './ProfileNavigator';
import Books from './BooksNavigator';

import {Search} from '../screens';

import TabIcon from './components/TabIcon';

import {Theme} from '../theme';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {colors} = useTheme<Theme>();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
        },
        activeTintColor: colors.secondary,
        inactiveTintColor: colors.primary,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: (props) => (
            <TabIcon name="library" {...props} size={24} />
          ),
        }}
        name="Your books"
        component={Books}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabIcon name="person" {...props} size={24} />,
        }}
        name="Profile"
        component={ProfileNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: (props) => <TabIcon name="search" {...props} size={24} />,
        }}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
