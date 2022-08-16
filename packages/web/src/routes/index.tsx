import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GameMain from "@rn-card-game/app/src/screens/game/game-main";

const StackNav = createStackNavigator();

const Navigator = () => (
  <NavigationContainer>
    <StackNav.Navigator initialRouteName="Game Main">
      <StackNav.Screen
        name="Game Main"
        component={GameMain}
        options={{headerShown: false}}
      />
    </StackNav.Navigator>
  </NavigationContainer>
);

export default Navigator;