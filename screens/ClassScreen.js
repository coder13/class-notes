import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Modal } from 'react-native';
import { FAB, Button, TextInput } from 'react-native-paper';
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

  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const curSchool = state.currentSchool;

  const handleLectureSubmit = (name) => {
    setText('');
    addLecture(curSchool, 'Spring 2021', 'CS 446', name); // change for better adding
    setModalVisible(!modalVisible);
  }

  //console.log(state);

  return (
    <>
      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: '100%', }} >

          {state.schools.map((school) => (
            school.name === curSchool ? (school.terms.map((term) => (
              term.classes.map((classes) => (
                classes.lectures.map((lecture) => (
                  <Button
                    mode="text"
                    uppercase=""
                    onPress={() => navigation.navigate("editnote")}
                    key={lecture.title}
                    label={lecture.title}
                    labelStyle={styles.buttonText}
                    style={styles.button}
                  > {lecture.title} </Button>
                ))
              ))
            ))) : null
          ))}


          {/* 
          <Button mode="text" uppercase="" onPress={() => navigation.navigate("editnote")} labelStyle={styles.buttonText} style={styles.button} >
            Lecture 1
          </Button>
          <Button mode="text" uppercase="" onPress={() => navigation.navigate("editnote")} labelStyle={styles.buttonText} style={styles.button} >
            Lecture 2
          </Button>*/}
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
                    handleLectureSubmit(text)}
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

export default ClassScreen;
