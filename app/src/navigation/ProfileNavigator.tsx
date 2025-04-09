import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@shopify/restyle';

import Settings from '@/screens/Settings';
import EditProfile from '@/screens/EditProfile';
import Profile from '@/screens/Profile';

import {BackIcon} from '../components';

import {Theme} from '../theme';

export type ProfileNavigatorParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<ProfileNavigatorParamList>();

const ProfileNavigator = () => {
  const {colors} = useTheme<Theme>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: colors.foreground,
        headerStyle: {
          backgroundColor: colors.background,
          shadowOffset: {width: 0, height: 0},
        },
        headerBackImage: () => <BackIcon color={colors.foreground} />,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{title: 'Edit profile'}}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{
          title: 'Settings',
        }}
        name="Settings"
        component={Settings}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
