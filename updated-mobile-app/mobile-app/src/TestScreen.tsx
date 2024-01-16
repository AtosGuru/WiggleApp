import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

function TestScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text>test</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TestScreen;
