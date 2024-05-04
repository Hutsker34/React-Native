import React from "react"; 
import { createAppContainer } from "react-navigation"; 
import { createStackNavigator } from "react-navigation-stack"; 
import Toast from 'react-native-toast-message';
import HomePage from "./screens/HomePage"; 
import SignUp from "./screens/SignUp";
import Search from "./screens/Search";
import SandBox from './components/SandBox'
import AlbumTracks from "./screens/albumTracks/AlbumTracks";
import { Provider } from 'react-redux';
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from "./store";

const AppNavigator = createStackNavigator(
  {
    SignUp: SignUp,
    Home: HomePage,
    Search: Search,
    AlbumTracks: AlbumTracks,
    SandBox: SandBox
  },
  {
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

const Navigator = createAppContainer(AppNavigator);

export default function App() {
  return (
    <Provider  store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Navigator />
        <Toast />
      </PersistGate>
    </Provider> 
  );
}