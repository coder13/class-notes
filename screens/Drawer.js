import React, { useContext } from 'react';
import { View } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { SchoolsContext } from './SchoolsProvider';

function DrawerContent() {
  const { state } = useContext(SchoolsContext);
  console.log(24, state);
  return (
      <DrawerContentScrollView>
          <View>
              <Drawer.Section>
                  {state.schools.map((school) => (
                      <DrawerItem key={school.name} label={school.name} />
                  ))}
              </Drawer.Section>
          </View>
      </DrawerContentScrollView>
  );
}

export default DrawerContent;
