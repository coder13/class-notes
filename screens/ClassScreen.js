import React, { useContext } from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Appbar, FAB, IconButton, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { ThemeContext } from './ThemeController';
import { SchoolsContext } from './SchoolsProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

function ClassScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { state } = useContext(SchoolsContext);
  const route = useRoute();
  console.log(route);

  return (
    <>
      {/* list of terms with ability to scroll */}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ScrollView style={{ flex: 1, width: 400, }} >
          <Button mode="text" uppercase="" onPress={() => navigation.navigate("editnote")} labelStyle={styles.buttonText} style={styles.button} >
            Lecture 1
          </Button>
          <Button mode="text" uppercase="" onPress={() => navigation.navigate("editnote")} labelStyle={styles.buttonText} style={styles.button} >
            Lecture 2
          </Button>
        </ScrollView>

        {/* add term button */}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => console.log("Note added")}
        />

      </SafeAreaView>
    </>
  );
}

export default ClassScreen;
