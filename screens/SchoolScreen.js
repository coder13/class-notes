import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, Modal, View } from 'react-native';
import { FAB, Button, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';

function SchoolScreen({ navigation }) {

  const { theme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(SchoolsContext);
  const curSchool = state.currentSchool;

  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  // dropdown info
  const [seasonOpen, setSeasonOpen] = useState(false);
  const [seasonValue, setSeasonValue] = useState(null);
  const [seasonItems, setSeasonItems] = useState([
    { label: 'Winter', value: 'Winter', },
    { label: 'Spring', value: 'Spring' },
    { label: 'Summer', value: 'Summer' },
    { label: 'Fall', value: 'Fall' },
  ])

  function addTerm(school, termName) {
    dispatch({ type: 'addTerm', school, termName })
  }

  const handleTermSubmit = (name) => {
    setText('');
    if (name != '') {
      addTerm(curSchool, name);
    }
    setModalVisible(!modalVisible);
  };

  return (
    /* list of terms with ability to scroll */
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView style={{ flex: 1, width: "100%", height: '100%' }} >

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
                screen: "term",
                params: { path: curSchool + '/' + terms.termName }
              })}
            > {terms.termName} </Button>
          ))) : null
        ))}

      </ScrollView>

      {/* popup for text input */}
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Modal style={{ width: 100, height: 100, justifyContent: 'center' }}
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <View style={{ width: 300, height: 100, }} >
              {/* 
              <DropDownPicker
                open={seasonOpen}
                onPress={() => setSeasonOpen(!seasonOpen)}
                items={seasonItems}
                value={seasonValue}
                onChangeValue={seasonValue => setSeasonValue(seasonValue)}
                setValue={seasonValue => setSeasonValue(seasonValue)}
                closeAfterSelecting={true}
                placeholder="Season"
              />*/}
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
    bottom: 0,
    right: 0,
    marginBottom: 50,
    marginRight: 10,
  },
});

export default SchoolScreen;