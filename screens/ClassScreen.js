import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Appbar, FAB, IconButton, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';



function ClassScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(SchoolsContext);
  const route = useRoute();
  console.log(route);

  return (
    <>
      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: 400, }} >
          <Button mode="text" uppercase="" onPress={() => navigation.navigate("editnote")} labelStyle={styles.buttonText} style={styles.button} >
            Lecture 1
          </Button>
          <Button mode="text" uppercase="" onPress={() => navigation.navigate("editnote")} labelStyle={styles.buttonText} style={styles.button} >
            Lecture 2
          </Button>
        </ScrollView>

        {/* add term button */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => console.log("Note added")}
        />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    backgroundColor: "rgb(98,0,238)",
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

export default ClassScreen;
