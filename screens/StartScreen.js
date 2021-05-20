import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

// components/screens
import SchoolScreen from "./SchoolScreen";
import SchoolScreen2 from "./SchoolScreen2";
import Settings from "./Settings";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// add functionality to create new school (Drawer Item)

function SchoolToSchool() {
    return (
        <Drawer.Navigator initialRouteName="School" screenOptions={{ headerShown: false }}  >
            <Drawer.Screen name="CWU" component={SchoolScreen} />
            <Drawer.Screen name="WSU" component={SchoolScreen2} />
        </Drawer.Navigator>
    )
}

function StartScreen() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="School" screenOptions={{ headerShown: false }}  >
                <Stack.Screen name="School" component={SchoolToSchool} />
                <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StartScreen;