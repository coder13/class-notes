import React from 'react';
import { Text, View } from 'react-native';
import { Appbar, FAB, IconButton } from 'react-native-paper';

function Settings({navigation}) {
    return (
        <Appbar.Header>
            <Appbar.Content title="Settings" titleStyle={{ left: 50, fontSize: 35, fontFamily: 'sans-serif', }} />
            <IconButton 
            icon="arrow-left" 
            color="white" 
            onPress={() => navigation.navigate("School")}
            size={30}
            style={{ right: 350 }} 
            />


        </Appbar.Header>
    );
}

export default Settings;