import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer as ReactNativePaperDrawer, Button, TextInput } from 'react-native-paper';

import { SchoolsContext } from "./SchoolsProvider";
import { ThemeContext } from './ThemeController';

function DrawerContent() {
    const { state, dispatch } = useContext(SchoolsContext);
    const [text, setText] = useState('');

    const { theme } = useContext(ThemeContext);

    const handleSchoolSubmit = (name) => {
        setText('');
        if (name != '') {
            addSchool(name);
        }
    }

    function addSchool(school) {
        dispatch({ type: 'addSchool', payload: school });
    }

    function setSchool(name) {
        dispatch({ type: 'setSchool', payload: name });
    }

    return (
        <DrawerContentScrollView style={{ backgroundColor: theme.backgroundColor }}>
            <View>
                <ReactNativePaperDrawer.Section>
                    {state.schools.map((school) => (
                        <DrawerItem labelStyle={{ color: theme.textColor }} key={school.name} label={school.name} onPress={() => setSchool(school.name)} />
                    ))}
                </ReactNativePaperDrawer.Section>
                <ReactNativePaperDrawer.Section>
                    <TextInput labelStyle={{ color: theme.textColor }} style={{ backgroundColor: theme.drawerAddColor }} label="Add New School" value={text} onChangeText={text => setText(text)} onEndEditing={() => handleSchoolSubmit(text)} />
                </ReactNativePaperDrawer.Section>
            </View>
        </DrawerContentScrollView>
    );
}

export default DrawerContent;
