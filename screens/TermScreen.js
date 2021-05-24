import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Appbar, FAB, IconButton, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';


function TermScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(SchoolsContext);
  const route = useRoute();
  //console.log(route);

  function addClass(school, termName, className) {
    dispatch({ type: 'addClass', school, termName, className })
  }

  const curSchool = state.currentSchool;

  //console.log(state);

  return (
    <>
      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: '100%', }} >

          {state.schools.map((school) => (
            school.name === curSchool ? (school.terms.map((terms) => (
              terms.classes.map((classes) => (
                <Button
                  mode="text"
                  uppercase=""
                  onPress={() => navigation.navigate("class", {
                    screen: 'class',
                    params: { class: 'CS 446' }
                  })}
                  key={classes.code}
                  label={classes.code}
                  labelStyle={styles.buttonText}
                  style={styles.button}
                > {classes.code} </Button>
              ))
            ))) : null
          ))}
        </ScrollView>

        {/* add class button */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => addClass('CWU', 'Spring 2021', 'CS 380')}
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

export default TermScreen;