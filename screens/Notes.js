import React from 'react';
import { List } from 'react-native-paper';

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

  return (
    <div>
      {items.map((item) => (
        <List.Item key={item.id} title={item.title} description={item.date.toDateString()} />
      ))}
    </div>
  );
}

export default NotesScreen;
