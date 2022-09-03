import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './navigations/Tab';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
    return(
      <SafeAreaProvider>
        <NavigationContainer>
            <TabNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    );
};

export default App;
