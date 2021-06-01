import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Modal } from 'react-native';
import { FAB, Button, TextInput, List } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';


function ClassScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { state, dispatch } = useContext(SchoolsContext);
  const route = useRoute();

  // path info
  const temp = route.params;
  const temp2 = JSON.stringify(temp);
  const path = temp2.slice(9, temp2.length - 2);
  const curTerm = path.slice(path.indexOf('\/') + 1, path.lastIndexOf('\/'));
  const curClass = path.slice(path.lastIndexOf('\/') + 1, path.length);

  // modal info
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const curSchool = state.currentSchool;

  function addLecture(school, termName, className, lectureTitle) {
    dispatch({ type: 'addLecture', school, termName, className, lectureTitle })
  }

  const handleLectureSubmit = (name) => {
    setText('');
    if (name != '') {
      addLecture(curSchool, curTerm, curClass, name);
    }
    setModalVisible(!modalVisible);
  }

  return (
    <>
      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: '100%', }} >

          {state.schools.map((school) => (
            school.name === curSchool ? (school.terms.map((term) => (
              term.termName === curTerm ? (
                term.classes.map((classes) => (
                  classes.code === curClass ? (
                    classes.lectures.map((lecture) => (
                      <List.Item
                        mode="text"
                        uppercase=""
                        onPress={() => navigation.navigate("editnote", {
                          screen: 'editnote',
                          params: { path: path + '/' + lecture.id }
                        })}
                        key={lecture.title}
                        label={lecture.title}
                        labelStyle={styles.buttonText}
                        title={lecture.title}
                        description={new Date().toLocaleDateString()}
                      />
                    ))) : null
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
                  label="Add New Lecture"
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
                    handleLectureSubmit(text)}
                  labelStyle={{ color: 'white' }}
                  style={{ backgroundColor: "rgb(98,0,238)", width: '50%', bottom: 38, alignSelf: 'flex-end' }} >
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

         {/* Back Button */}
         <FAB
          style={styles.fab_back}
          icon="arrow-left"
          onPress={() => navigation.goBack()}
        />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
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

export default ClassScreen;
