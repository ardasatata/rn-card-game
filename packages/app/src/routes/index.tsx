import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimeList from '../screens/anime-list';
import Information from '../screens/information';
import FavoriteList from "../screens/favorite-list";
import {SearchIcon, StarIcon} from "../assets/svgs";
import {color, spacing} from "../styles";

const StackNav = createStackNavigator();

const Navigator = () => (
  <NavigationContainer>
    <StackNav.Navigator initialRouteName="Anime List">
      <StackNav.Screen
        name="Anime List"
        component={AnimeList}
        options={{headerShown: false}}
      />
    </StackNav.Navigator>
  </NavigationContainer>
);

export default Navigator;