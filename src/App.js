import React, { useEffect } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './screens/RootStack';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); // splash active time 2sec
    } catch(e){
      console.log(e.message);
    }
  });

    return(
      <SafeAreaProvider>
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    );
};

export default App;
