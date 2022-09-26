import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './screens/RootStack';

const App = () => {
    return(
      <SafeAreaProvider>
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    );
};

export default App;
