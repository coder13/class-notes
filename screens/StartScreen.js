import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Appbar, Title, Caption, Paragraph, Drawer as ReactNativePaperDrawer, Text, TouchableRipple, Switch, } from 'react-native-paper';

// components/screens
import SchoolScreen from "./SchoolScreen";
import SchoolScreen2 from "./SchoolScreen2";
import SettingsScreen from "./Settings";
import { SchoolsContext } from './SchoolsProvider';
// import { Header } from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerContent() {
    const { state } = useContext(SchoolsContext);
    console.log(24, state);
    return (
        <DrawerContentScrollView>
            <View>
                <ReactNativePaperDrawer.Section>
                    {state.schools.map((school) => (
                        <DrawerItem key={school.name} label={school.name} />
                    ))}
                </ReactNativePaperDrawer.Section>
            </View>
        </DrawerContentScrollView>
    );
}

function Header({ navigation, previous, scene }) {
    const { route } = scene;

    return (
        <Appbar.Header>
            <Appbar.Action
                icon="menu"
                onPress={() => navigation.openDrawer()}
                size={30}
            />
            <Appbar.Content title="CWU" titleStyle={{ left: 60, fontSize: 35, fontFamily: 'sans-serif', }} />
            {/* settings button */}
            {route.name === 'Settings' ?
                <Appbar.BackAction
                    onPress={() => navigation.navigate("School")}
                    size={30}
                />
            :
                <Appbar.Action
                    icon="cog"
                    onPress={() => navigation.navigate("Settings")}
                    size={30}
                />
            }

        </Appbar.Header>
    );
}

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
            <Stack.Screen name="School" component={SchoolScreen} />
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