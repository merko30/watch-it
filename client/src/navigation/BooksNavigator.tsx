import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Home, List} from '../screens';

const BooksNavigator = createStackNavigator();

const Books = () => {
  return (
    <BooksNavigator.Navigator>
      <BooksNavigator.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <BooksNavigator.Screen
        name="List"
        component={List}
        options={{
          headerShown: false,
        }}
      />
    </BooksNavigator.Navigator>
  );
};

export default Books;
