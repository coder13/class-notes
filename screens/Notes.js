import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, FAB } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  fab: {
    position: 'absolute',
    margin: '1em',
    right: 0,
    bottom: 0,
  },
})

function NotesScreen ({ navigation }) {
  const items = [{
    id: 1,
    date: new Date(),
    title: 'Lecture 1'
  }, {
    id: 2,
    date: new Date(),
    title: 'Lecture 2'
  }, {
    id: 3,
    date: new Date(),
    title: 'Lecture 3'
  }, {
    id: 4,
    date: new Date(),
    title: 'Lecture 4'
  }];

  const createNewNote = () => {

  }

  return (
    <View style={styles.container}>
      <div>
        {items.map((item) => (
          <List.Item key={item.id} title={item.title} description={item.date.toDateString()} />
          ))}
      </div>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => createNewNote()}
      />
    </View>
  );
}

export default NotesScreen;
