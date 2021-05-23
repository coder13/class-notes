import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { SchoolsContext } from './SchoolsProvider';

function Header({ navigation, previous, scene }) {
    const { route } = scene;

    const { state, dispatch } = useContext(SchoolsContext);

    return (
        <Appbar.Header style={{ backgroundColor: "rgb(98,0,238)", }}>
            <Appbar.Action
                icon="menu"
                onPress={() => navigation.openDrawer()}
                size={30}
            />
            <Appbar.Content title={state.currentSchool} titleStyle={{ left: 60, fontSize: 35, fontFamily: 'sans-serif', }} />
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

export default Header;