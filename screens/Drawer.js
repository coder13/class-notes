import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer as ReactNativePaperDrawer, Button, TextInput } from 'react-native-paper';

import { SchoolsContext } from "./SchoolsProvider";

function DrawerContent() {
    const { state, dispatch } = useContext(SchoolsContext);
    const [text, setText] = useState('');

    const handleSchoolSubmit = (name) => {
        setText('');
        addSchool(name);
    }

    function addSchool(school) {
        dispatch({ type: 'addSchool', payload: school });
    }

    function setSchool(name) {
        dispatch({ type: 'setSchool', payload: name });
    }

    //console.log(state);
    return (
        <DrawerContentScrollView>
            <View>
                <ReactNativePaperDrawer.Section>
                    {state.schools.map((school) => (
                        <DrawerItem key={school.name} label={school.name} onPress={() => setSchool(school.name)} />
                    ))}
                </ReactNativePaperDrawer.Section>
                <ReactNativePaperDrawer.Section>
                    <TextInput label="Add New School" value={text} onChangeText={text => setText(text)} onEndEditing={() => handleSchoolSubmit(text)} />
                </ReactNativePaperDrawer.Section>
            </View>
        </DrawerContentScrollView>
    );
}

export default DrawerContent;
