import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CalenderApp } from "../screens/CalenderScreen";
import { Chat } from "../screens/ChatScreen";
import CameraButton from "../components/CameraButton";
import { StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import  Icon  from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();
function TabNavigation() {
    return (
      <>
        <View style={styles.block}>
          <Tab.Navigator
           screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#3B8C66",
           }}>
           <Tab.Screen
            name="Calendar"
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

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  }
});

export default TabNavigation;