
import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Appbar, FAB, IconButton, Button } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext } from './ThemeController';

const Drawer = createDrawerNavigator();

function SchoolScreen({ navigation }) {

  const { theme } = useContext(ThemeContext)

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="CWU" titleStyle={{ left: 60, fontSize: 35, fontFamily: 'sans-serif', }} />

        {/* settings button */}
        <IconButton
          icon="cog"
          color="white"
          onPress={() => navigation.navigate("Settings")}
          size={30}
          style={{}}
        />

        {/* school select button */}
        <IconButton
          icon="menu"
          color="white"
          onPress={() => console.log("Navigate Schools") /*navigation.navigate("School 2")*/}
          size={30}
          style={{ position: 'absolute', left: 0 }}
        />
      </Appbar.Header>

      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: 400, }} >
          <Button mode="text" uppercase="" onPress={() => console.log("Spring 2021")} labelStyle={styles.buttonText} style={styles.button} >
            Spring 2021
          </Button>

          <Button mode="text" uppercase="" onPress={() => console.log("Winter 2021")} labelStyle={styles.buttonText} style={styles.button} >
            Winter 2021
          </Button>

          <Button mode="text" uppercase="" onPress={() => console.log("Fall 2020")} labelStyle={styles.buttonText} style={styles.button} >
            Fall 2020
          </Button>
        </ScrollView>

        {/* add term button */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => console.log("Term added")}
        />

      </SafeAreaView>
    </>
  );
} // end TermSelection

// var Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  button: {
    width: 250,
    backgroundColor: "#007aff",
    marginTop: 75,
    alignSelf: 'center',
  },
  buttonText: {
    color: "white",
    fontFamily: "sans-serif",
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    top: 650,
    right: 20,
  },
});

export default SchoolScreen;