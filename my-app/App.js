import React from "react"; 
import { createAppContainer } from "react-navigation"; 
import { createStackNavigator } from "react-navigation-stack"; 

import HomePage from "./screens/HomePage"; 
import SignUp from "./screens/SignUp"


const AppNavigator = createStackNavigator( 
{
    SignUp: SignUp,
	Home: HomePage, 

	 
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
	<Navigator> 
        <SignUp/>
	</Navigator> 
); 
} 
