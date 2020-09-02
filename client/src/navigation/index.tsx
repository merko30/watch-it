import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {useTheme} from '@shopify/restyle';
import Icon from 'react-native-vector-icons/Ionicons';

import {Details} from '../screens';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';

import {navigationRef} from '../utils/navigation';

import {Theme} from '../theme';

import {RootState} from '../store/reducers';

const BLANK_HEADER = {
  title: '',
  headerStyle: {
    backgroundColor: 'white',
    shadowOffset: {width: 0, height: 0},
  },
};

export type RootStackParamList = {
  Details: {id: string};
  Home: undefined;
  List: {shelf: string};
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const {colors, spacing} = useTheme<Theme>();

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
          headerBackImage: () => (
            <Icon
              name="chevron-back"
              style={{marginLeft: spacing.s}}
              size={32}
            />
          ),
          headerBackTitleVisible: false,
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
                ...BLANK_HEADER,
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
