import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import {useTheme} from '@shopify/restyle';

// import {Details, Splash} from '../screens';

import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import {navigationRef} from '../utils/navigation';
import {Splash} from 'screens';
import {AuthContext, IAuthContext} from 'auth/AuthProvider';

// import {BackIcon} from '../components';

// import {LEFT_ICON, BLANK_HEADER} from './headerStyles';

// import {Theme} from '../theme';
// import {AuthContext} from 'auth/AuthProvider';

export type RootStackParamList = {
  Details: {id: string};
  Home: undefined;
  List: {shelf: string};
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  // const {colors} = useTheme<Theme>();
  // // const loggedIn = useSelector<RootState>((state) => state.auth.loggedIn);

  const {loading, loggedIn} = useContext(AuthContext) as IAuthContext;

  // const linking = {
  //   config: {
  //     screens: {
  //       ResetPassword: {
  //         path: 'resetpassword/:token',
  //         parse: {
  //           token: (token: string) => token.split('=')[1],
  //         },
  //       },
  //     },
  //   },
  //   prefixes: ['bookerapp://'],
  // };

  if (loading) {
    return <Splash />;
  }

  return (
    // TODO: add linking
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {/* screenOptions={{
          ...LEFT_ICON,
          ...BLANK_HEADER.headerStyle,
          headerBackImage: () => <BackIcon color={colors.foreground} />
        */}
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
            {/* <Stack.Screen
              name="Details"
              options={{
                headerStyle: {
                  borderBottomWidth: 0,
                  elevation: 0,
                  backgroundColor: colors.backgroundThree,
                },
                headerTintColor: colors.foreground,
                headerTitle: '',
              }}
              component={Details}
            /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
