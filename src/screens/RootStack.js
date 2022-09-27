import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from "./TabScreen";
// import CameraStackScreen from "./CameraStack";
import RectangleScannerScreen from "../components/RectangleScannerScreen";

const Stack = createStackNavigator();
const CameraStack = createStackNavigator();

function RootStack(){
    return(
        <Stack.Navigator>
          <Stack.Screen
            name = "BottomTab"
            component = {TabNavigation}
            options={({navigation, route}) => ({
                headerShown: false,
              })}
           />
           <Stack.Screen
            name = "CameraScreens"
            component = {CameraStackScreen}
            options={({navigation, route}) => ({
                headerShown: false,
              })}
           />           
        </Stack.Navigator>
    )
}

const CameraStackScreen = () => {
    return(
      <Stack.Navigator>
        <CameraStack.Screen 
          name = 'RectangleScanner'
          options={({navigation, route}) => ({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
          })}
          component = {RectangleScannerScreen} />
      </Stack.Navigator>
    )
  }

export default RootStack;