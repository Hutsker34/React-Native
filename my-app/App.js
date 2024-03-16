import React from "react"; 
import { createAppContainer } from "react-navigation"; 
import { createStackNavigator } from "react-navigation-stack"; 

import HomePage from "./screens/HomePage"; 
import SignUp from "./screens/SignUp";
import Search from "./screens/Search";
import AlbumTracks from "./screens/AlbumTracks";

const AppNavigator = createStackNavigator(
  {
    SignUp: SignUp,
    Home: HomePage,
    Search: Search,
    AlbumTracks: AlbumTracks
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

const Navigator = createAppContainer(AppNavigator);

export default function App() {
  return <Navigator />;
}