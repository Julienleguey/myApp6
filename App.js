import React from 'react';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import HomeScreen from './pages/HomeScreen';
import PostItReadNote from './pages/PostItReadNote';
import PostItReadList from './pages/PostItReadList';
import { openDatabase } from 'react-native-sqlite-storage';

let db = openDatabase({ name: 'postit', createFromLocation: "~data.db" });

const App = createStackNavigator(
  {
  HomeScreen: HomeScreen,
  PostItReadNote: PostItReadNote,
  PostItReadList: PostItReadList,
  },
  {
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#ff6871',
        marginBottom: 0,
      },
      headerTintColor: 'd2dde4',
      headerTitleStyle: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: 'black',

      },
    },
  }
);

export default createAppContainer(App);
