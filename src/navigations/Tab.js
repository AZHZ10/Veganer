import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Calender } from "../screens/CalenderScreen";
import { Chat } from "../screens/ChatScreen";
import  Lens  from "../screens/LensScreenT";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Calender" component={Calender} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="Lens" component={Lens} />
        </Tab.Navigator>
    );
};

export default TabNavigation;