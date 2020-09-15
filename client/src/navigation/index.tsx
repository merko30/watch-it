import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {useTheme} from '@shopify/restyle';

import {Details} from '../screens';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import {navigationRef} from '../utils/navigation';

import {BackIcon} from '../components';

import {RootState} from '../store/reducers';

import {LEFT_ICON, BLANK_HEADER} from './headerStyles';

import {Theme} from '../theme';

export type RootStackParamList = {
  Details: {id: string};
  Home: undefined;
  List: {shelf: string};
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const {colors} = useTheme<Theme>();
  const loggedIn = useSelector<RootState>((state) => state.auth.loggedIn);

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
    prefixes: ['bookerapp://'],
  };

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          ...LEFT_ICON,
        }}>
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
                headerStyle: {
                  ...BLANK_HEADER.headerStyle,
                  backgroundColor: colors.backgroundThree,
                },
                headerTintColor: colors.foreground,
                headerBackImage: () => <BackIcon color={colors.foreground} />,
                title: 'Book details',
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
