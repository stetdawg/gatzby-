import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import searchScreen from '../screens/searchScreen';
import SeachResultsScreen from '../screens/SearchResultsScreen';
import multipleResultesScreen from '../screens/multipleResultesScreen';

const navigationOptions = {
header: null
};
const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const MultiResults = createStackNavigator({
  multi: multipleResultesScreen,
});

MultiResults.navigationOptions = {
  tabBarLabel: 'multi',
  header: 'none',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SeachResultsStack = createStackNavigator({
  searchResults: SeachResultsScreen,
});

SeachResultsStack.navigationOptions = {
  tabBarLabel: 'results',
  header: null,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator(
  {
  HomeStack,
  MultiResults,
  SeachResultsStack,
  },
  navigationOptions);
