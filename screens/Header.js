import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { SchoolsContext } from './SchoolsProvider';

function Header({ navigation, scene }) {
    const { route } = scene;

    const { state } = useContext(SchoolsContext);

    const param = JSON.stringify(route.params);

    let path = '';

    const curSchool = state.currentSchool;

    if (!param) {
        path = curSchool;
    }

    else {
        const temp = param.indexOf("\"path\"");
        path = param.slice(temp + 8, param.length - 3);
    }

    return (
        <Appbar.Header style={{ backgroundColor: "rgb(98,0,238)", }}>
            <Appbar.Action
                icon="menu"
                onPress={() => navigation.openDrawer()}
                size={30}
            />
            <Appbar.Content title={path} titleStyle={{ left: 0, fontSize: 25, fontFamily: 'sans-serif', }} />
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