import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';

function SchoolScreen({ navigation }) {

  const { theme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(SchoolsContext);

  function addTerm(termName) {
    dispatch({ type: 'addTerm', payload: termName })
  }

  //console.log(state.schools);
  return (
    <>
      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: "100%", }} >

          {state.schools.map((schools) => (
            schools.terms.map((terms) => (
              <Button
                mode="text"
                uppercase=""
                labelStyle={styles.buttonText}
                style={styles.button}
                key={terms.termName} label={terms.termName}
                // UPDATE onPress TO WORK DYNAMICALLY
                onPress={() => navigation.navigate("term", {
                  scren: "term",
                  params: { term: 'spring 2021' }
                })}
              > {terms.termName} </Button>
            ))
          ))}

          {/* Leaving these in for sake of knowing how all buttons connected */}
          {/* 
          <Button
            mode="text"
            uppercase=""
            onPress={() => navigation.navigate("term", {
              scren: "term",
              params: { term: 'spring 2021' }
            })}
            labelStyle={styles.buttonText} style={styles.button}
          >
            Spring 2021
          </Button>

          <Button
            mode="text"
            uppercase=""
            onPress={() => navigation.navigate("term", {
              scren: "term",
              params: { term: 'winter 2021' }
            })}
            labelStyle={styles.buttonText}
            style={styles.button}
          >
            Winter 2021
          </Button>

          <Button
            mode="text"
            uppercase=""
            onPress={() => navigation.navigate("term", {
              scren: "term",
              params: { term: 'fall 2020' }
            })}
            labelStyle={styles.buttonText}
            style={styles.button}
          >
            Fall 2020
          </Button> */}




        </ScrollView>
        {/* add term button */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => console.log("added term") /* addTerm('Winter 2021') */} // the addTerm function does not work
        />

      </SafeAreaView>
    </>
  );
} // end TermSelection

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

export default SchoolScreen;