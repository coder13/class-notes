import React, { useState, useContext, useRef } from 'react';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, TextInput as BasicTextInput } from 'react-native';
import { Appbar, TextInput, IconButton } from 'react-native-paper';
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
  },
  iconBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
  }
})

function EditNoteScreen({ navigation }) {
  const { state } = useContext(SchoolsContext);
  const contentInputRef = useRef();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TextInput flat label="title" style={styles.titleInput} />
      <View style={styles.contentContainer}>
        <BasicTextInput
          ref={contentInputRef}
          style={styles.contentInput}
          flat
          multiline
          dense
        />
      </View>
      <Appbar style={styles.iconBar}>
        <Appbar.Action icon="format-bold" />
        <Appbar.Action icon="format-italic" />
        <Appbar.Action icon="format-underline" />
        <Appbar.Action icon="format-indent-decrease" />
        <Appbar.Action icon="format-indent-increase" />
      </Appbar>
    </SafeAreaView>
  );
}

export default EditNoteScreen;
