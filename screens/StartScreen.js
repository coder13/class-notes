import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Appbar, Drawer as ReactNativePaperDrawer, Text, TouchableRipple, Switch, } from 'react-native-paper';

// components/screens
import SchoolScreen from "./SchoolScreen";
import TermScreen from "./TermScreen";
import ClassScreen from "./ClassScreen";
import EditNoteScreen from "./EditNote";
import SettingsScreen from "./Settings";

import Header from './Header';
import DrawerContent from './Drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const SettingsStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: Header,
            }}
        >
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
}

const SchoolStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                header: Header,
            }}
        >
            <Stack.Screen name="school" component={SchoolScreen} />
            <Stack.Screen name="term" component={TermStackNavigator} />
        </Stack.Navigator>
    );
}

const TermStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="term" component={TermScreen} />
            <Stack.Screen name="class" component={ClassStackNavigator} />
        </Stack.Navigator>
    );
}

const ClassStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="class" component={ClassScreen} />
            <Stack.Screen name="editnote" component={EditNoteScreen} />
        </Stack.Navigator>
    );
}

function StartScreen() {
    return (
        <NavigationContainer>                
            <Drawer.Navigator
                initialRouteName="School"
                drawerContent={() => <DrawerContent />}
            >
                <Stack.Screen name="School" component={SchoolStackNavigator} />
                <Stack.Screen name="Settings" component={SettingsStackNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default StartScreen;