import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, Modal, View } from 'react-native';
import { FAB, Button, TextInput } from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';

import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';

function SchoolScreen({ navigation }) {

  const { theme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(SchoolsContext);
  const curSchool = state.currentSchool;

  // dropdown info
  const [modalVisible, setModalVisible] = useState(false);
  const [seasonValue, setSeasonValue] = useState('Spring');
  const [yearValue, setYearValue] = useState((new Date()).getFullYear()); // default to this year

  const date = new Date();
  let curYear = date.getFullYear();

  function addTerm(school, termName) {
    dispatch({ type: 'addTerm', school, termName })
  }

  const handleTermSubmit = (season, year) => {
    addTerm(curSchool, seasonValue + ' ' + yearValue);
    setModalVisible(!modalVisible);
    setSeasonValue('');
    setYearValue((new Date()).getFullYear());
  };

  const [firstSchool, setFirstSchool] = useState('');
  const [firstSchoolModalVisible, setFirstSchoolModalVisible] = useState(true);
  const handleFirstSchoolSubmit = (name) => {
    dispatch({ type: 'addSchool', payload: name });
    dispatch({ type: 'setSchool', payload: name });
    setFirstSchoolModalVisible(!firstSchoolModalVisible)
  }

  if (state.currentSchool === '') {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Modal style={{ width: 100, height: 100, justifyContent: 'center' }}
          animationType='slide'
          transparent={true}
          visible={firstSchoolModalVisible}
          onRequestClose={() => setFirstSchoolModalVisible(!firstSchoolModalVisible)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccccccef' }}>
            <Text style={{ fontSize: 20 }}>Welcome! Enter in a school to continue</Text>
            <View style={{ width: 330, height: 100, }} >
              <TextInput
                label="Add a new School"
                value={firstSchool}
                onChangeText={firstSchool => setFirstSchool(firstSchool)}
                style={{ borderColor: 'black', borderWidth: 5, }} />
              <Button
                title='Submit'
                onPress={() => handleFirstSchoolSubmit(firstSchool)}
                labelStyle={{ color: 'white' }}
                style={{ backgroundColor: "rgb(98,0,238)", width: '100%', alignSelf: 'flex-start' }} >Submit </Button>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

  else {
    return (
      /* list of terms with ability to scroll */
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: "100%", height: '100%' }} >

          {/* If curSchool === '', then ask for school input. Else display page */}

          {state.schools.map((school) => (
            school.name === curSchool ? (school.terms.map((terms) => (
              <Button
                mode="text"
                uppercase=""
                labelStyle={styles.buttonText}
                style={styles.button}
                key={terms.termName} label={terms.termName}
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccccccef' }}>
              <Text style={{ color: 'black', fontFamily: "sans-serif", fontSize: 20 }}>Select Season and Year</Text>
              <View style={{ width: 330, height: 100, borderColor: 'black', borderWidth: 5, }} >
                {/* Seasons */}
                <Picker
                  selectedValue={seasonValue}
                  onValueChange={(itemValue) => setSeasonValue(itemValue)}
                  style={{ height: 100, width: 150, }}
                >
                  <Picker.Item label="Winter" value="Winter" />
                  <Picker.Item label="Spring" value="Spring" />
                  <Picker.Item label="Summer" value="Summer" />
                  <Picker.Item label="Fall" value="Fall" />
                </Picker>

                <Picker
                  selectedValue={yearValue}
                  onValueChange={(itemValue) => setYearValue(itemValue)}
                  style={{ height: 100, width: 150, left: 170, bottom: 100 }}
                >
                  <Picker.Item label='2021' value='2021' />
                  <Picker.Item label='2020' value='2020' />
                  <Picker.Item label='2019' value='2019' />
                  <Picker.Item label='2018' value='2018' />
                </Picker>

              </View>
              <Button
                title='Close'
                onPress={() => setModalVisible(!modalVisible)}
                labelStyle={{ color: 'white' }}
                style={{ backgroundColor: "rgb(98,0,238)", width: '40%', alignSelf: 'flex-start', left: 40, }} >
                Close</Button>
              <Button
                title='Submit'
                onPress={() => handleTermSubmit()}
                labelStyle={{ color: 'white' }}
                style={{ backgroundColor: "rgb(98,0,238)", width: '40%', alignSelf: 'flex-end', bottom: 37.5, right: 40, }} >
                Submit</Button>
            </View>

          </Modal>
        </View>


        {/* add term button */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setModalVisible(true)}
        />

        {/* Back Button */}
        <FAB
          style={styles.fab_back}
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />

      </SafeAreaView >
    );
  } // end TermSelection
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
    bottom: 0,
    right: 0,
    marginBottom: 50,
    marginRight: 10,
  },
  fab_back: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 50,
    marginRight: 10,
  },
});

export default SchoolScreen;