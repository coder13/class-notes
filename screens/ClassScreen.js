import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Appbar, FAB, IconButton, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';



function ClassScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(SchoolsContext);
  const route = useRoute();
  //console.log(route);

  function addLecture(school, termName, className, lectureTitle) {
    dispatch({ type: 'addLecture', school, termName, className, lectureTitle })
  }

  console.log(state);

  return (
    <>
      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: '100%', }} >
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
          onPress={() => addLecture('CWU', 'Spring 2021', 'CS 446', 'Lecture 3')}
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
