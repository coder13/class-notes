import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Appbar, Switch, IconButton } from 'react-native-paper';

import { ThemeContext } from './ThemeController';


function Settings({ navigation }) {

    const { dark, theme, toggle } = useContext(ThemeContext)

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const { colors } = theme;
    return (
        <>
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

            <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]} >
                <Text style={[styles.text, { color: theme.color }]}>
                    Dark mode
                </Text>
                <Switch
                    value={dark}
                    onValueChange={toggle}
                    style={styles.swtich}
                    trackColor={{ false: "#767557", true: '#ccc' }} thumbColor
                    thumbColor={dark ? '#fff' : '#f4f3f4'}
                />

            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    swtich: {
        position: 'absolute', right: 60, marginTop: 55
    },
    text: {
        position: 'absolute',
        left: 20,
        fontSize: 25,
        marginTop: 50,
    }
});

export default Settings;