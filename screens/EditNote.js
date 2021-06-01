import React, { useState, useContext, useRef } from 'react';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput as BasicTextInput } from 'react-native';
import { Appbar, TextInput, IconButton, FAB } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { SchoolsContext } from './SchoolsProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  titleInput: {
  },
  contentContainer: {
    flex: 1,
  },
  contentInput: {
    flex: 1,
    margin: 4,
  },
  iconBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  fab_back: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 50,
    marginRight: 10,
  },
})

function EditNoteScreen({ navigation }) {
  const { state, dispatch } = useContext(SchoolsContext);
  const contentInputRef = useRef();
  const route = useRoute();

  const path = route.params.params.path.split('/');
  const curTerm = path[1];
  const curClass = path[2];
  const curLecture = path[3];
  const curSchool = state.currentSchool;

  const school = state.schools.find((s) => s.name === curSchool);
  const term = school.terms.find((t) => t.termName === curTerm);
  const c = term.classes.find((c) => c.code === curClass);
  const lecture = c.lectures.find((l) => l.id == curLecture);

  const [title, setTitle] = useState(lecture.title);
  const [content, setContent] = useState(lecture.content);

  // update state everytime data changes
  useEffect(() => {
    dispatch({
      type: 'updateLecture',
      school: school.name,
      termName: term.termName,
      className: c.code,
      lecture: {
        id: lecture.id,
        title,
        content,
      },
    });
  }, [title, content])


  return (
    <SafeAreaView style={styles.container}>
      <TextInput flat label="title" value={title} onChangeText={text => setTitle(text)} style={styles.titleInput} />
      <View style={styles.contentContainer}>
        <BasicTextInput
          ref={contentInputRef}
          style={styles.contentInput}
          flat
          multiline
          dense
          value={content}
          onChangeText={setContent}
        />
      </View>
      <Appbar style={styles.iconBar}>
        <Appbar.Action icon="format-bold" />
        <Appbar.Action icon="format-italic" />
        <Appbar.Action icon="format-underline" />
        <Appbar.Action icon="format-indent-decrease" />
        <Appbar.Action icon="format-indent-increase" />
      </Appbar>

      {/* Back Button */}
      <FAB
        style={styles.fab_back}
        icon="arrow-left"
        onPress={() => navigation.goBack()}
      />

    </SafeAreaView>
  );
}

export default EditNoteScreen;
