import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';

import {navigationRef} from '../utils/navigation';

import Details from '@/screens/Details';
import Splash from '@/screens/Splash';

import {AuthContext, IAuthContext} from '@/providers/AuthProvider';

export type RootStackParamList = {
  Details: {id: string; type: 'movie' | 'tv'};
  Home: undefined;
  List: {shelf: string};
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const {loading, loggedIn} = useContext(AuthContext) as IAuthContext;

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
            options={{headerShown: false}}
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
                headerTransparent: true,
                headerMode: 'float',
                headerTintColor: 'black',
                headerLeftContainerStyle: {paddingLeft: 4},
              }}
              component={Details}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
