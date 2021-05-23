import React, { useContext } from 'react';
import { View } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer as ReactNativePaperDrawer, Button } from 'react-native-paper';

import { SchoolsContext } from "./SchoolsProvider";

function DrawerContent() {
    const { state, dispatch } = useContext(SchoolsContext);

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
                        <DrawerItem key={school.name} label={school.name} /> /* function setSchool used here */
                    ))}
                </ReactNativePaperDrawer.Section>
                <ReactNativePaperDrawer.Section>
                    <Button onPress={() => addSchool('UW')}>Add School</Button>
                </ReactNativePaperDrawer.Section>
            </View>
        </DrawerContentScrollView>
    );
}

export default DrawerContent;
