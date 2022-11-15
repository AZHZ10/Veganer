import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MenuResultScreen = () => {

    return(
        <View style={styles.container}>
            <Text>
                Menu Result Screen
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default MenuResultScreen;