import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import cameraScreen from '../screens/CameraScreen';
import SeachResultsScreen from '../screens/SearchResultsScreen';

const navigationOptions = {
header: 'null'
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

const cameraStack = createStackNavigator({
  camera: cameraScreen,
});

cameraStack.navigationOptions = {
  tabBarLabel: 'cam',
  header: 'null',
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
  cameraStack,
  SeachResultsStack,
  },
  navigationOptions);
