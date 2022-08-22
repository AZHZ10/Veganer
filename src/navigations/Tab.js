import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CalenderApp } from "../screens/CalenderScreen";
import { Chat } from "../screens/ChatScreen";
import  Lens  from "../screens/LensScreenT";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Calender" component={CalenderApp} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Lens" component={Lens} />
        </Tab.Navigator>
    );
};

export default TabNavigation;