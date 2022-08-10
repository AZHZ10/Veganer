import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './navigations/Tab';

const App = () => {
    return(
        <NavigationContainer>
            <TabNavigation />
        </NavigationContainer>
    );
};

/* const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#008d62',
    },
    title: {
        fontSize: 35,
    }
});
*/

export default App;
