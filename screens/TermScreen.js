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
  //console.log(route);

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
    addClass(curSchool, curTerm, name); // change for better adding
    setModalVisible(!modalVisible);
  }

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
                    params: { path: path + '/' + classes.code }
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
                  label="Add New Class"
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
                    handleClassSubmit(text)}
                  labelStyle={{ color: 'white' }}
                  style={{ backgroundColor: "rgb(98,0,238)", width: '50%', left: 150, bottom: 38 }} >
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
    top: 650,
    right: 20,
  },
});

export default TermScreen;