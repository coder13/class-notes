import React from 'react';
import { Appbar } from 'react-native-paper';

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

export default Header;