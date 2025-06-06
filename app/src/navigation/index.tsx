import React, { useContext } from 'react';
import { NavigationContainer, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';

import { navigationRef } from '../utils/navigation';

import Details from '@/screens/Details';
import Splash from '@/screens/Splash';

import { AuthContext, IAuthContext } from '@/providers/AuthProvider';
import List from '@/screens/List';

export type RootStackParamList = {
  Details: { id: number; type: 'movie' | 'tv' };
  Home: undefined;
  List: { status: string };
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const { loading, loggedIn } = useContext(AuthContext) as IAuthContext;

  const linking = {
    config: {
      screens: {
        ResetPassword: {
          path: 'resetpassword/:token',
          parse: {
            token: (token: string) => token.split('=')[1],
          },
        },
      },
    },
    prefixes: ['watchit://'],
  };

  if (loading) {
    return <Splash />;
  }

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator>
        {!loggedIn ? (
          <Stack.Screen
            options={{ headerShown: false }}
            component={AuthNavigator}
            name="Auth"
          />
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Home"
              component={TabNavigator}
            />
            <Stack.Screen
              name="Details"
              options={{
                headerShown: false,
              }}
              component={Details}
            />
            <Stack.Screen
              name="List"
              options={{
                headerShown: false,
              }}
              component={List}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
