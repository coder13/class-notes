import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Modal } from 'react-native';
import { FAB, Button, TextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';


function TermScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(SchoolsContext);
  const route = useRoute();

  // path info
  const temp = route.params;
  const temp2 = JSON.stringify(temp);
  const path = temp2.slice(9, temp2.length - 2);
  const curTerm = path.slice(path.indexOf('\/') + 1, path.length);

  // modal info
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const curSchool = state.currentSchool;


  function addClass(school, termName, className) {
    dispatch({ type: 'addClass', school, termName, className })
  }

  const handleClassSubmit = (name) => {
    setText('');
    if (name != '') {
      addClass(curSchool, curTerm, name);
    }
    setModalVisible(!modalVisible);
  }

  return (
    <>
      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: '100%', }} >

          {state.schools.map((school) => (
            school.name === curSchool ? (school.terms.map((terms) => (
              terms.termName === curTerm ? (
                terms.classes.map((classes) => (
                  <Button
                    mode="text"
                    uppercase=""
                    onPress={() => navigation.navigate('class', {
                      screen: 'class',
                      params: { path: path + '/' + classes.code }
                    })}
                    key={classes.code}
                    label={classes.code}
                    labelStyle={styles.buttonText}
                    style={styles.button}
                  > {classes.code} </Button>
                ))) : null
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
              <View style={{ width: 330, height: 100, }} >
                <TextInput
                  label="Add New Class"
                  value={text}
                  onChangeText={text => setText(text)}
                  style={{ borderColor: 'black', borderWidth: 5, }} />
                <Button
                  title='Close'
                  onPress={() => setModalVisible(!modalVisible)}
                  labelStyle={{ color: 'white' }}
                  style={{ backgroundColor: "rgb(98,0,238)", width: '50%', alignSelf: 'flex-start' }} >
                  Close</Button>
                <Button
                  title='Submit'
                  onPress={() =>
                    handleClassSubmit(text)}
                  labelStyle={{ color: 'white' }}
                  style={{ backgroundColor: "rgb(98,0,238)", width: '50%', bottom: 38, alignSelf: 'flex-end' }} >
                  Submit</Button>
              </View>
            </View>

          </Modal>
        </View>

        {/* add class button */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => setModalVisible(true)}
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
    bottom: 0,
    right: 0,
    marginBottom: 50,
    marginRight: 10,
  },
});

export default TermScreen;