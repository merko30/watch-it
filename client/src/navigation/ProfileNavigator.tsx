import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {EditProfile, Security, Stats, Profile} from '../screens';

import BackIcon from '../components/BackIcon';

export type ProfileNavigatorParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Security: undefined;
  Stats: undefined;
};

const BLANK = {
  headerStyle: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 0},
  },
  headerBackTitleVisible: false,
  headerBackImage: () => <BackIcon />,
};

const Stack = createStackNavigator<ProfileNavigatorParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...BLANK,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
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
          title: '',
        }}
        name="Stats"
        component={Stats}
      />
      <Stack.Screen
        options={{
          title: 'Security settings',
        }}
        name="Security"
        component={Security}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
