import React, {useLayoutEffect} from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation, useRoute} from '@react-navigation/native';

import { CalenderApp } from "./CalenderScreen";
import { Chat } from "./ChatScreen";
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
const ChatStack = createStackNavigator();

function TabNavigation() {
  const navigation = useNavigation();
    return (
      <>
        <View style={styles.block}>  
          <Tab.Navigator
          //이 부분 수정
           //initialRouteName="CalendarStack"
           screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#3B8C66",
           }}>
           <Tab.Screen
            name="CalendarTab"
            component={CalenderApp}
            options={{
              tabBarIcon: ({color}) =>(
                <Icon name = "calendar-today" size={24} color={color} />
              ),
            }}
           />
           <Tab.Screen
            name="ChatTab"
            component={View}
           // component={ChatStackScreen}
            options={{
              tabBarIcon: ({color}) =>(
                <Icon name = "chat-bubble-outline" size={24} color={color} />
              ),
            }}
            listeners = {() =>({
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate("ChatScreen");
              }
            })}
           />  
           </Tab.Navigator>
         </View>
         <CameraButton />
      </>
    );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  }
});

export default TabNavigation;