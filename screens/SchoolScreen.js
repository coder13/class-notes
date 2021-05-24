import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, Modal, View } from 'react-native';
import { FAB, Button, TextInput } from 'react-native-paper';

import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';

function SchoolScreen({ navigation }) {

  const { theme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(SchoolsContext);
  const curSchool = state.currentSchool;

  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function addTerm(school, termName) {
    dispatch({ type: 'addTerm', school, termName })
  }

  const handleTermSubmit = (name) => {
    setText('');
    addTerm(curSchool, name);
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: "100%", }} >

          {state.schools.map((school) => (
            school.name === curSchool ? (school.terms.map((terms) => (
              <Button
                mode="text"
                uppercase=""
                labelStyle={styles.buttonText}
                style={styles.button}
                key={terms.termName} label={terms.termName}
                // UPDATE onPress TO WORK DYNAMICALLY
                onPress={() => navigation.navigate("term", {
                  scren: "term",
                  params: { term: terms.termName }
                })}
              > {terms.termName} </Button>
            ))) : null
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

        {/* popup for text input */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Modal style={{ width: 100, height: 100, justifyContent: 'center' }}
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <View style={{ width: 300, height: 100, }} >
                <TextInput
                  label="Add New Term"
                  value={text}
                  onChangeText={text => setText(text)} />
                <Button
                  title='Close'
                  onPress={() => setModalVisible(!modalVisible)}
                  labelStyle={{ color: 'white' }}
                  style={{ backgroundColor: "rgb(98,0,238)", width: '50%', }} >
                  Close</Button>
                <Button
                  title='Submit'
                  onPress={() =>
                    handleTermSubmit(text)}
                  labelStyle={{ color: 'white' }}
                  style={{ backgroundColor: "rgb(98,0,238)", width: '50%', left: 150, bottom: 38 }} >
                  Submit</Button>
              </View>
            </View>

          </Modal>
        </View>


        {/* add term button */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setModalVisible(true) /*addTerm(curSchool, 'Winter 2021')*/}
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