import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import Details from "../screens/Details";
import Home from "../screens/Home";

import TabIcon from "./TabIcon";

import { navigationRef } from "../utils/navigation";

import { COLORS } from "../theme/colors";
import { useSelector } from "react-redux";
import { Text } from "react-native";
import Auth from "../screens/Auth";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: COLORS.lightBrown,
        activeTintColor: COLORS.darkBrown,
        inactiveTintColor: COLORS.lightestBrown,
        showLabel: false
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: props => <TabIcon name="book" iconProps={props} />
        }}
        name="Your books"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <TabIcon name="person" iconProps={props} />
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <TabIcon name="search" iconProps={props} />
        }}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const { loggedIn } = useSelector(({ auth: { loggedIn } }) => ({ loggedIn }));
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {!loggedIn ? (
          <>
            <Stack.Screen
              name="Auth"
              options={{ header: () => {} }}
              component={Auth}
            />
            <Stack.Screen
              name="Login"
              options={{ header: () => {} }}
              component={Login}
            />
            <Stack.Screen
              name="Register"
              options={{ header: () => {} }}
              component={Register}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{ header: () => {} }}
              name="Home"
              component={HomeNavigator}
            />
            <Stack.Screen
              name="Details"
              options={{
                headerTitle: props => {
                  return null;
                }
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
