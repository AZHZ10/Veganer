import React, {useLayoutEffect} from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {createStackNavigator} from '@react-navigation/stack';
import {useRoute} from '@react-navigation/native';

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

function TabNavigation() {
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
            name="Calendar"
            //component={CalenderStackScreen}
            component={CalenderApp}
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
/*
//calender 화면 스택 
//쓸 일이... 없을 것 같기도 
const CalendarStackScreen = ({navigation, route}) => {
  const getrouteName = async() => {
    const routeName = await getFocusedRouteNameFromRoute(route);
    
    if(routeName == 'Calendar' || routeName == undefined){
      navigation.setOptions({tabBarStyle: { display: 'flex' }});
    }
    else{
      navigation.setOptions({tabBarStyle: { display: 'none' }});
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
           tabBarStyle: { display: 'flex' }
        })}
        component={CalenderApp}
      />
    </Stack.Navigator>
  );
};

*/

//Camera 화면 스택(메뉴판 촬영/사진 선택 -> 결과 출력까지의 화면)

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  }
});

export default TabNavigation;