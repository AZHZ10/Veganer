import React, {useLayoutEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from '@react-navigation/stack';

import { CalenderApp } from "../screens/CalenderScreen";
import { Chat } from "../screens/ChatScreen";
import CameraButton from "../components/CameraButton";
import RectangleScannerScreen from "../components/RectangleScannerScreen";

import { StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import  Icon  from "react-native-vector-icons/MaterialIcons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const CameraStack = createStackNavigator();
const CalendarStack = createStackNavigator();

function TabNavigation() {
    return (
      <>
        <View style={styles.block}>  
          <Tab.Navigator
          //이 부분 수정
           initialRouteName="CalendarStack"
           screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#3B8C66",
           }}>
           <Tab.Screen
            name="CalendarStack"
            //component={CalenderApp}
            component={CalendarStackScreen}
            options={{
              tabBarIcon: ({color}) =>(
                <Icon name = "calendar-today" size={24} color={color} />
              ),
            }}
           />
           <Tab.Screen
            name="Chat"
            component={Chat}
            options={{
              tabBarIcon: ({color}) =>(
                <Icon name = "chat-bubble-outline" size={24} color={color} />
              ),
            }}
           />  
           </Tab.Navigator>
         </View>
         <CameraButton />
      </>
    );
}
//calender화면 스택 (메뉴판 스캔 screen 포함)
const CalendarStackScreen = ({navigation, route}) => {
  const getrouteName = async() => {
    const routeName = await getFocusedRouteNameFromRoute(route);
    
    if(routeName == 'Calendar' || routeName == undefined){
      navigation.setOptions({tabBarVisible: true});
    }
    else{
      navigation.setOptions({tabBarVisible: false});
    }
    return routeName;
  };

  useLayoutEffect(() => {
    const routeName = getrouteName();
  }, [navigation, route]);

  return(
    <Stack.Navigator>
      <CalendarStack.Screen
        name = 'Calendar'
        options={({navigation, route}) => ({
          tabBarVisible: true,
        })}
        component={CalenderApp}
      />
      <CameraStack.Screen name = "RectangleScanner" component = {RectangleScannerScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  }
});

export default TabNavigation;